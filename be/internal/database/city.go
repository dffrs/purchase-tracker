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

func (u *CityModel) Insert(city *City) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO city (name, zip_code, country_id) VALUES ($1, $2, $3)"

	result, err := u.DB.ExecContext(ctx, query, city.Name, city.ZipCode, city.CountryID)
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
