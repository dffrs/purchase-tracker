package database

import (
	"database/sql"
	"time"
)

type UsersModel struct {
	DB *sql.DB
}

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     int       `json:"phone"`
	CreatedAt time.Time `json:"created_at"`
}
