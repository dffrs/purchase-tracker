package database

import (
	"context"
	"database/sql"
	"time"
)

type UsersModel struct {
	DB *sql.DB
}

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name" binding:"required"`
	Email     string    `json:"email" binding:"required"`
	Phone     int       `json:"phone" binding:"required"`
	AddressID int       `json:"addressID" binding:"required"`
	CreatedAt time.Time `json:"createdAt"`
}

type AddressInfo struct {
	Street       string `json:"street"`
	StreetNumber string `json:"streetNumber"`
	Apartment    string `json:"apartment"`
	City         string `json:"city"`
	ZipCode      string `json:"zipCode"`
	Code         string `json:"code"`
	CountryName  string `json:"countryName"`
}

type UserInfo struct {
	ID        int         `json:"id"`
	Name      string      `json:"name"`
	Email     string      `json:"email"`
	Phone     int         `json:"phone"`
	CreatedAt time.Time   `json:"createdAt"`
	Address   AddressInfo `json:"address"`
}

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

func (u *UsersModel) Get(userID int) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	user := new(User)

	query := "SELECT * FROM users WHERE id = $1"

	err := u.DB.QueryRowContext(ctx, query, userID).Scan(&user.ID, &user.Name, &user.Email, &user.Phone, &user.AddressID, &user.CreatedAt)
	if err != nil {
		// no rows ?
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, err
	}

	return user, nil
}

func (u *UsersModel) GetAll() ([]*UserInfo, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := ` 
	SELECT 
		users.id AS id,
		users.name AS name,
		users.email AS email,
		users.phone AS phone,
		users.created_at AS createdAt,
		address.street AS street,
		address.street_number AS streetNumber,
		address.apartment AS apartment,
		city.name AS city,
		city.zip_code AS zipCode,
		country.code AS code,
		country.name AS countryName
	FROM
		users
		INNER JOIN address ON address.id = users.address_id
		INNER JOIN city ON city.id = address.city_id
		INNER JOIN country ON country.id = city.country_id
	`

	rows, err := u.DB.QueryContext(ctx, query, nil)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []*UserInfo{}

	for rows.Next() {
		user := new(UserInfo)

		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.Phone,
			&user.CreatedAt,
			&user.Address.Street,
			&user.Address.StreetNumber,
			&user.Address.Apartment,
			&user.Address.City,
			&user.Address.ZipCode,
			&user.Address.Code,
			&user.Address.CountryName,
		)
		if err != nil {
			return nil, err
		}

		users = append(users, user)

	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

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
