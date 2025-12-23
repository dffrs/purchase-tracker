package database

import (
	"context"
	"database/sql"
	"time"
)

type CityModel struct {
	DB *sql.DB
}

type City struct {
	ID        *int
	Name      *string
	ZipCode   *string
	CountryID *int
}

func (c *CityModel) GetOrCreate(name, zipCode *string, countryID *int) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	insert := "INSERT OR IGNORE INTO city (name, zip_code, country_id) VALUES (?, ?, ?)"

	_, err := c.DB.ExecContext(ctx, insert, name, zipCode, countryID)
	if err != nil {
		return 0, err
	}

	query := "SELECT id FROM city WHERE name = ? AND zip_code = ? AND country_id = ?"

	var id int
	err = c.DB.QueryRowContext(ctx, query, name, zipCode, countryID).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}
