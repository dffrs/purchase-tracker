package database

import (
	"database/sql"
)

type DeliveryModel struct {
	DB *sql.DB
}

type Delivery struct {
	ID   *int
	Name *string
}
