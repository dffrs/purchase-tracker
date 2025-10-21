package database

import (
	"database/sql"
	"time"
)

type ProductsModel struct {
	DB *sql.DB
}

type Product struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Code      string    `json:"code"`
	Price     float64   `json:"price"`
	CreatedAT time.Time `json:"created_at"`
}
