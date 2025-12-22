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

func (c *CityModel) Insert(city *City) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO city (name, zip_code, country_id) VALUES ($1, $2, $3)"

	result, err := c.DB.ExecContext(ctx, query, city.Name, city.ZipCode, city.CountryID)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil
	}

	castID := int(id)
	city.ID = &castID

	return nil
}

func (c *CityModel) GetByName(cityName *string) (*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	city := new(City)

	query := "SELECT * FROM city WHERE name = $1"

	err := c.DB.QueryRowContext(ctx, query, cityName).Scan(&city.ID, &city.Name, &city.ZipCode, &city.CountryID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return city, nil
}
