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

func (c *CountryModel) GetOrCreate(code, name *string) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	insert := "INSERT OR IGNORE INTO country (code, name) VALUES (?, ?)"

	_, err := c.DB.ExecContext(ctx, insert, code, name)
	if err != nil {
		return 0, err
	}

	query := "SELECT id FROM country WHERE code = ?"

	var id int

	err = c.DB.QueryRowContext(ctx, query, code).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}
