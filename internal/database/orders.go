package database

import (
	"database/sql"
	"time"
)

type OrdersModel struct {
	DB *sql.DB
}

type Order struct {
	ID        int       `json:"id"`
	UserID    int       `json:"userId"`
	OrderDate time.Time `json:"orderDate"`
}
