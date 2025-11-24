package database

import (
	"database/sql"
)

type CityModel struct {
	DB *sql.DB
}

type City struct {
	ID        sql.NullInt64
	Name      sql.NullString
	ZipCode   sql.NullString
	CountryID sql.NullInt64
}
