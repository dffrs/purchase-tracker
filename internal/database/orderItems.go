package database

import (
	"context"
	"database/sql"
	"time"
)

type OrderItemsModel struct {
	DB *sql.DB
}

type OrdersItem struct {
	ID        int `json:"id"`
	Quantity  int `json:"quantity"`
	OrderID   int `json:"orderId"`
	ProductID int `json:"productId"`
}

func (oi *OrderItemsModel) Insert(orderItem *OrdersItem) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)"

	result, err := oi.DB.ExecContext(ctx, query, orderItem.OrderID, orderItem.ProductID, orderItem.Quantity)
	if err != nil {
		return err
	}

	orderItemsID, err := result.LastInsertId()
	if err != nil {
		return nil
	}

	orderItem.ID = int(orderItemsID)

	return nil
}

func (oi *OrderItemsModel) Get(orderItemID int) (*OrdersItem, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM order_items WHERE id = $1"

	orderItem := new(OrdersItem)

	err := oi.DB.QueryRowContext(ctx, query, orderItemID).Scan(&orderItem.ID, &orderItem.Quantity, &orderItem.OrderID, &orderItem.ProductID)
	if err != nil {
		// no rows?
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return orderItem, nil
}
