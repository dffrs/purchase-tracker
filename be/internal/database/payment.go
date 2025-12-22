package database

import (
	"database/sql"
)

type PaymentModel struct {
	DB *sql.DB
}

type Payment struct {
	ID   *int
	Name *string
}
