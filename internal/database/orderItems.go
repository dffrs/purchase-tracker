package database

import "database/sql"

type OrdersItemsModel struct {
	DB *sql.DB
}

type OrderItem struct {
	ID       int `json:"id"`
	Quantity int `json:"quantity"`
	OrderID  int `json:"orderId"`
	Product  int `json:"productId"`
}
