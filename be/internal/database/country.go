package database

import (
	"database/sql"
)

type CountryModel struct {
	DB *sql.DB
}

type Country struct {
	ID   *int
	Code *string
	Name *string
}
