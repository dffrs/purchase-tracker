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

func (o OrdersModel) GetAllOrders() ([]*Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM orders"

	orders := []*Order{}

	rows, err := o.DB.QueryContext(ctx, query, nil)
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

func (o OrdersModel) GetOrdersByUserID(userID int) ([]*Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT orders.id, orders.user_id, orders.order_date FROM orders JOIN users ON users.id = orders.user_id WHERE users.id = $1"

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

func (o OrdersModel) Get(orderID int) (*Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM orders WHERE orders.id = $1"

	order := new(Order)

	err := o.DB.QueryRowContext(ctx, query, orderID).Scan(&order.ID, &order.UserID, &order.OrderDate)
	if err != nil {
		// no rows ?
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, err
	}

	return order, nil
}

func (o OrdersModel) Update(updatedOrder *Order) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "UPDATE orders SET user_id = $1 WHERE id = $2"

	_, err := o.DB.ExecContext(ctx, query, updatedOrder.UserID, updatedOrder.ID)
	if err != nil {
		return err
	}

	return nil
}

func (o OrdersModel) Delete(orderID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "DELETE FROM orders WHERE id = $1"

	_, err := o.DB.ExecContext(ctx, query, orderID)
	if err != nil {
		return err
	}

	return nil
}
