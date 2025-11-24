package database

import (
	"database/sql"
)

type AddressModel struct {
	DB *sql.DB
}

type Address struct {
	ID           sql.NullInt64
	Street       sql.NullString
	StreetNumber sql.NullString
	Apartment    sql.NullString
	CityID       sql.NullInt64
}
