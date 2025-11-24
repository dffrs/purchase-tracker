package database

import (
	"context"
	"database/sql"
	m "purchase-tracker/internal/models"
	"time"
)

type UsersModel struct {
	DB *sql.DB
}

type User struct {
	ID        int
	Name      string
	Email     string
	Phone     int
	AddressID int
	CreatedAt time.Time
}

func toUserResponse(
	user *User,
	address *Address,
	city *City,
	country *Country,
) *m.UserResponse {
	return &m.UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Phone:     user.Phone,
		CreatedAt: user.CreatedAt,
		Address: m.AddressResponse{
			Street:       address.Street,
			StreetNumber: address.StreetNumber,
			Apartment:    address.Apartment,
			City: m.CityResponse{
				Name:    city.Name,
				ZipCode: city.ZipCode,
				Country: m.CountryResponse{
					Code: country.Code,
					Name: country.Name,
				},
			},
		},
	}
}

// TODO: Update me with Address
func (u *UsersModel) Insert(user *User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO users (name, email, phone, addressID, created_at) VALUES ($1, $2, $3, $4, $5)"

	result, err := u.DB.ExecContext(ctx, query, user.Name, user.Email, user.Phone, user.AddressID, time.Now().Unix())
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil
	}

	user.ID = int(id)

	return nil
}

func (u *UsersModel) Get(userID int) (*m.UserResponse, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	user := new(User)
	address := new(Address)
	city := new(City)
	country := new(Country)

	query := `
	SELECT 
  	users.id, users.name, users.email, users.phone, users.created_at,
  	address.id, address.street, address.street_number, address.apartment,
  	city.id, city.name, city.zip_code,
  	country.id, country.code, country.name
  FROM 
		users
  LEFT JOIN address ON address.id = users.address_id
  LEFT JOIN city ON city.id = address.city_id
  LEFT JOIN country ON country.id = city.country_id
	WHERE
		users.id = $1
	`

	err := u.DB.QueryRowContext(ctx, query, userID).Scan(
		&user.ID, &user.Name, &user.Email, &user.Phone, &user.CreatedAt,
		&address.ID, &address.Street, &address.StreetNumber, &address.Apartment,
		&city.ID, &city.Name, &city.ZipCode,
		&country.ID, &country.Code, &country.Name,
	)
	if err != nil {
		// no rows ?
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, err
	}

	return toUserResponse(user, address, city, country), nil
}

func (u *UsersModel) GetAll() ([]*m.UserResponse, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
	SELECT 
  	users.id, users.name, users.email, users.phone, users.created_at,
  	address.id, address.street, address.street_number, address.apartment,
  	city.id, city.name, city.zip_code,
  	country.id, country.code, country.name
  FROM users
  LEFT JOIN address ON address.id = users.address_id
  LEFT JOIN city ON city.id = address.city_id
  LEFT JOIN country ON country.id = city.country_id`

	rows, err := u.DB.QueryContext(ctx, query, nil)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []*m.UserResponse{}

	for rows.Next() {
		user := new(User)
		address := new(Address)
		city := new(City)
		country := new(Country)

		err := rows.Scan(
			&user.ID, &user.Name, &user.Email, &user.Phone, &user.CreatedAt,
			&address.ID, &address.Street, &address.StreetNumber, &address.Apartment,
			&city.ID, &city.Name, &city.ZipCode,
			&country.ID, &country.Code, &country.Name,
		)
		if err != nil {
			return nil, err
		}

		users = append(users, toUserResponse(user, address, city, country))

	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

// TODO: Update me with Address
func (u *UsersModel) Update(user *User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "UPDATE users SET name = $1, email = $2, phone = $3, addressID = $4 WHERE id = $5"

	_, err := u.DB.ExecContext(ctx, query, user.Name, user.Email, user.Phone, user.AddressID, user.ID)
	if err != nil {
		return err
	}

	return nil
}

// TODO: Update me with Address
func (u *UsersModel) Delete(userID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "DELETE FROM users WHERE id = $1"

	_, err := u.DB.ExecContext(ctx, query, userID)
	if err != nil {
		return err
	}

	return nil
}
