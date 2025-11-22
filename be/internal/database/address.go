package database

import (
	"database/sql"
)

type AddressModel struct {
	DB *sql.DB
}

type Address struct {
	ID           int    `json:"id"`
	Street       string `json:"street" binding:"required"`
	StreetNumber string `json:"streetNumber"`
	Apartment    string `json:"apartment"`
	CityID       int    `json:"cityID" binding:"required"`
}
