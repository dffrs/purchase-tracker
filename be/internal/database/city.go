package database

import (
	"database/sql"
)

type CityModel struct {
	DB *sql.DB
}

type City struct {
	ID        int
	Name      string
	ZipCode   string
	CountryID int
}
