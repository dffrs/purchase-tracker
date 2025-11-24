package internal

import (
	"database/sql"
	"time"
)

type CountryResponse struct {
	Code sql.NullString `json:"code"`
	Name sql.NullString `json:"name"`
}

type CityResponse struct {
	Name    sql.NullString  `json:"name"`
	ZipCode sql.NullString  `json:"zipCode"`
	Country CountryResponse `json:"country"`
}

type AddressResponse struct {
	Street       sql.NullString `json:"street"`
	StreetNumber sql.NullString `json:"streetNumber"`
	Apartment    sql.NullString `json:"apartment"`
	City         CityResponse   `json:"city"`
}

type UserResponse struct {
	ID        int             `json:"id"`
	Name      string          `json:"name"`
	Email     string          `json:"email"`
	Phone     int             `json:"phone"`
	CreatedAt time.Time       `json:"createdAt"`
	Address   AddressResponse `json:"address"`
}
