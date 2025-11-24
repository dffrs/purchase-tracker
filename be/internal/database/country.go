package database

import (
	"database/sql"
)

type CountryModel struct {
	DB *sql.DB
}

type Country struct {
	ID   sql.NullInt64
	Code sql.NullString
	Name sql.NullString
}
