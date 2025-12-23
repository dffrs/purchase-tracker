package internal

import (
	"time"
)

type CountryResponse struct {
	Code *string `json:"code"`
	Name *string `json:"name"`
}

type CityResponse struct {
	Name    *string         `json:"name"`
	ZipCode *string         `json:"zipCode"`
	Country CountryResponse `json:"country"`
}

type AddressResponse struct {
	Street       *string      `json:"street"`
	StreetNumber *string      `json:"streetNumber"`
	Apartment    *string      `json:"apartment"`
	City         CityResponse `json:"city"`
}

type UserResponse struct {
	ID        int             `json:"id"`
	Name      string          `json:"name"`
	Email     string          `json:"email"`
	Phone     int             `json:"phone"`
	CreatedAt time.Time       `json:"createdAt"`
	Address   AddressResponse `json:"address"`
}

type Product struct {
	Name     string  `json:"name" binding:"required"`
	Code     string  `json:"code" binding:"required"`
	Quantity int     `json:"quantity" binding:"required"`
	RRP      float64 `json:"rrp" binding:"required"`
	WSP      float64 `json:"wsp" binding:"required"`
}

type OrderPayload struct {
	User     UserResponse `json:"user" binding:"required"`
	Payment  string       `json:"payment" binding:"required"`
	Delivery string       `json:"delivery" binding:"required"`
	Products []Product    `json:"products" binding:"required"`
}
