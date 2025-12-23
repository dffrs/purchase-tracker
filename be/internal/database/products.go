package database

import (
	"context"
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
	RRP       float64   `json:"rrp" binding:"required"`
	WSP       float64   `json:"wsp" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
}

func (p *ProductsModel) Insert(product *Product) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO products (name, code, rrp, wsp, created_at) VALUES ($1, $2, $3, $4, $5)"

	result, err := p.DB.ExecContext(ctx, query, product.Name, product.Code, product.RRP, product.WSP, time.Now().Unix())
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	product.ID = int(id)

	return nil
}

func (p ProductsModel) GetOrCreate(name string, code string, rrp float64, wsp float64) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	insert := "INSERT OR IGNORE INTO products (name, code, rrp, wsp) VALUES (?, ?, ?, ?)"
	_, err := p.DB.ExecContext(ctx, insert, name, code, rrp, wsp)
	if err != nil {
		return 0, err
	}

	query := "SELECT id FROM products WHERE name = ? AND code = ?"

	var productID int
	err = p.DB.QueryRowContext(ctx, query, name, code).Scan(&productID)
	if err != nil {
		return 0, err
	}

	return productID, nil
}

func (p *ProductsModel) Get(productID int) (*Product, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	product := new(Product)

	query := "SELECT * FROM products WHERE id = $1"

	err := p.DB.QueryRowContext(ctx, query, productID).Scan(&product.ID, &product.Name, &product.Code, &product.RRP, &product.WSP, &product.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return product, nil
}

func (p *ProductsModel) GetAll() ([]*Product, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM products"

	rows, err := p.DB.QueryContext(ctx, query, nil)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	products := []*Product{}

	for rows.Next() {
		product := new(Product)

		err := rows.Scan(&product.ID, &product.Name, &product.Code, &product.RRP, &product.WSP, &product.CreatedAt)
		if err != nil {
			return nil, err
		}

		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func (p *ProductsModel) Update(product *Product) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "UPDATE products SET name = $1, code = $2, rrp = $3, wsp = $4 WHERE id = $5"

	_, err := p.DB.ExecContext(ctx, query, product.Name, product.Code, product.RRP, product.WSP, product.ID)
	if err != nil {
		return err
	}

	return nil
}

func (p *ProductsModel) Delete(productID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "DELETE FROM products WHERE id = $1"

	_, err := p.DB.ExecContext(ctx, query, productID)
	if err != nil {
		return err
	}

	return nil
}
