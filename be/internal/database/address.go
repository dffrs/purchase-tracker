package database

import (
	"context"
	"database/sql"
	"time"
)

type AddressModel struct {
	DB *sql.DB
}

type Address struct {
	ID           *int
	Street       *string
	StreetNumber *string
	Apartment    *string
	CityID       *int
}

func (a *AddressModel) Insert(address *Address) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT OR IGNORE INTO address (street, street_number, apartment, city_id) VALUES ($1, $2, $3, $4)"

	result, err := a.DB.ExecContext(ctx, query, address.Street, address.StreetNumber, address.Apartment, address.CityID, time.Now().Unix())
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil
	}

	castID := int(id)
	address.ID = &castID

	return nil
}

func (a *AddressModel) Get(addressID int) (*Address, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	city := new(Address)

	query := "SELECT * FROM address WHERE id = $1"

	err := a.DB.QueryRowContext(ctx, query, addressID).Scan(&city.ID, &city.Street, &city.StreetNumber, &city.Apartment, &city.CityID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return city, nil
}
