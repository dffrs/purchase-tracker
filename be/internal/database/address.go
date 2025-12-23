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

func (a *AddressModel) GetOrCreate(street, streetNumber, apartment *string, cityID *int) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	insert := "INSERT OR IGNORE INTO address (street, street_number, apartment, city_id) VALUES (?, ?, ?, ?)"

	_, err := a.DB.ExecContext(ctx, insert, street, streetNumber, apartment, cityID)
	if err != nil {
		return 0, err
	}

	query := "SELECT id FROM address WHERE street = ? AND street_number = ? AND apartment = ? AND city_id = ?"

	var id int
	err = a.DB.QueryRowContext(ctx, query, street, streetNumber, apartment, cityID).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}
