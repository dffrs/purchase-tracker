package database

import (
	"database/sql"
)

type CountryModel struct {
	DB *sql.DB
}

type Country struct {
	ID   int    `json:"id"`
	Code string `json:"code" binding:"required"`
	Name string `json:"name" binding:"required"`
}
