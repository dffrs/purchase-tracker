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

func (u *CountryModel) Insert(country *Country) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO city (code, name) VALUES ($1, $2)"

	result, err := u.DB.ExecContext(ctx, query, country.Code, country.Name)
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
