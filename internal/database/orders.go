package database

import (
	"context"
	"database/sql"
	"time"
)

type OrdersModel struct {
	DB *sql.DB
}

type Order struct {
	ID        int       `json:"id"`
	UserID    int       `json:"userId" binding:"required"`
	OrderDate time.Time `json:"orderDate"`
}

func (o OrdersModel) Insert(order *Order) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO orders (user_id, order_date) VALUES ($1, $2)"

	result, err := o.DB.ExecContext(ctx, query, order.UserID, time.Now().Unix())
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	order.ID = int(id)

	return nil
}

func (o OrdersModel) GetOrdersByUserID(userID int) ([]*Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT orders.id, orders.user_id, orders.order_date FROM orders INNER JOIN users ON users.id = orders.id"

	orders := []*Order{}

	rows, err := o.DB.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		order := new(Order)

		err := rows.Scan(&order.ID, &order.UserID, &order.OrderDate)
		if err != nil {
			return nil, err
		}

		orders = append(orders, order)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return orders, nil
}
