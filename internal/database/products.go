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

func (p *ProductsModel) Insert(product *Product) error {
	return nil
}

func (p *ProductsModel) Get() (*Product, error) {
	return nil, nil
}

func (p *ProductsModel) GetAll() ([]*Product, error) {
	return nil, nil
}

func (p *ProductsModel) Update(product *Product) error {
	return nil
}

func (p *ProductsModel) Delete(productID *Product) error {
	return nil
}
