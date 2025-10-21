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
	Name      string    `json:"name" binding:"required"`
	Code      string    `json:"code" binding:"required"`
	Price     float64   `json:"price" binding:"required"`
	CreatedAT time.Time `json:"created_at"`
}
