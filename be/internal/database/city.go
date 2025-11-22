package database

import (
	"database/sql"
)

type CityModel struct {
	DB *sql.DB
}

type City struct {
	ID        int    `json:"id"`
	Name      string `json:"name" binding:"required"`
	ZipCode   string `json:"zipCode" binding:"required"`
	CountryID int    `json:"countryID" binding:"required"`
}
