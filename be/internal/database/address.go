package database

import (
	"database/sql"
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
