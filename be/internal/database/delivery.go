package database

import (
	"context"
	"database/sql"
	"time"
)

type DeliveryModel struct {
	DB *sql.DB
}

type Delivery struct {
	ID   *int
	Name *string
}

func (d *DeliveryModel) GetOrInsert(delivery *string) (*string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	insert := "INSERT OR IGNORE INTO delivery (name) VALUES (?)"

	_, err := d.DB.ExecContext(ctx, insert, delivery)
	if err != nil {
		return nil, err
	}

	query := "SELECT id FROM delivery WHERE name = ?"

	var dName string
	err = d.DB.QueryRowContext(ctx, query, delivery).Scan(&dName)
	if err != nil {
		return nil, err
	}

	return &dName, nil
}
