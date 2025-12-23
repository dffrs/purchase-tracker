package database

import (
	"context"
	"database/sql"
	"time"
)

type PaymentModel struct {
	DB *sql.DB
}

type Payment struct {
	ID   *int
	Name *string
}

func (p *PaymentModel) GetOrCreate(payment *string) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	insert := "INSERT OR IGNORE INTO payment (name) VALUES (?)"

	_, err := p.DB.ExecContext(ctx, insert, payment)
	if err != nil {
		return 0, err
	}

	query := "SELECT id FROM payment WHERE name = ?"

	var paymentID int
	err = p.DB.QueryRowContext(ctx, query, payment).Scan(&paymentID)
	if err != nil {
		return 0, err
	}

	return paymentID, nil
}
