package database

import (
	"context"
	"database/sql"
	"time"
)

type CountryModel struct {
	DB *sql.DB
}

type Country struct {
	ID   *int
	Code *string
	Name *string
}

func (c *CountryModel) Insert(country *Country) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO country (code, name) VALUES ($1, $2)"

	result, err := c.DB.ExecContext(ctx, query, country.Code, country.Name)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil
	}

	castID := int(id)
	country.ID = &castID

	return nil
}

func (c *CountryModel) Get(countryID int) (*Country, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	country := new(Country)

	query := "SELECT * FROM country WHERE id = $1"

	err := c.DB.QueryRowContext(ctx, query, countryID).Scan(&country.ID, &country.Code, &country.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return country, nil
}
