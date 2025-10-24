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

type OrdersByUser struct {
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	Phone        int       `json:"phone"`
	ProductName  string    `json:"productName"`
	ProductCode  string    `json:"productCode"`
	ProductPrice float64   `json:"productPrice"`
	OrderDate    time.Time `json:"orderDate"`
	Quantity     int       `json:"quantity"`
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

func (oi *OrderItemsModel) GetByOrderID(orderID int) ([]*OrdersItem, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT order_items.id, order_items.order_id, order_items.product_id, order_items.quantity FROM order_items JOIN orders ON orders.id = order_items.order_id WHERE orders.id = $1"

	rows, err := oi.DB.QueryContext(ctx, query, orderID)
	if err != nil {
		return nil, err
	}

	orderItems := []*OrdersItem{}

	for rows.Next() {
		orderItem := new(OrdersItem)

		err := rows.Scan(&orderItem.ID, &orderItem.OrderID, &orderItem.ProductID, &orderItem.Quantity)
		if err != nil {
			return nil, err
		}

		orderItems = append(orderItems, orderItem)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return orderItems, nil
}

func (oi *OrderItemsModel) GetByProductID(productID int) ([]*OrdersItem, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT order_items.id, order_items.order_id, order_items.product_id, order_items.quantity FROM order_items JOIN products ON products.id = order_items.product_id WHERE products.id = $1"

	rows, err := oi.DB.QueryContext(ctx, query, productID)
	if err != nil {
		return nil, err
	}

	orderItems := []*OrdersItem{}

	for rows.Next() {
		orderItem := new(OrdersItem)

		err := rows.Scan(&orderItem.ID, &orderItem.OrderID, &orderItem.ProductID, &orderItem.Quantity)
		if err != nil {
			return nil, err
		}

		orderItems = append(orderItems, orderItem)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return orderItems, nil
}

func (oi OrderItemsModel) GetByUserID(userID int) ([]*OrdersByUser, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := ` 
	SELECT 
		users.name AS name,
		users.email AS email,
		users.phone AS phone,
		products.name AS productName,
		products.code AS productCode,
		products.price AS productPrice,
		orders.order_date AS orderDate,
		order_items.quantity AS quantity
	FROM
		users
		INNER JOIN orders ON orders.user_id = users.id
		INNER JOIN order_items ON order_items.order_id = orders.id
		INNER JOIN products ON products.id = order_items.product_id
	WHERE
		users.id = $1
	`

	rows, err := oi.DB.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}

	orderUsers := []*OrdersByUser{}

	for rows.Next() {
		orderUser := new(OrdersByUser)

		err := rows.Scan(
			&orderUser.Name,
			&orderUser.Email,
			&orderUser.Phone,
			&orderUser.ProductName,
			&orderUser.ProductCode,
			&orderUser.ProductPrice,
			&orderUser.OrderDate,
			&orderUser.Quantity,
		)
		if err != nil {
			return nil, err
		}

		orderUsers = append(orderUsers, orderUser)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return orderUsers, nil
}

func (oi OrderItemsModel) GetByUserEmail(userEmail string) ([]*OrdersByUser, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := ` 
	SELECT 
		users.name AS name,
		users.email AS email,
		users.phone AS phone,
		products.name AS productName,
		products.code AS productCode,
		products.price AS productPrice,
		orders.order_date AS orderDate,
		order_items.quantity AS quantity
	FROM
		users
		INNER JOIN orders ON orders.user_id = users.id
		INNER JOIN order_items ON order_items.order_id = orders.id
		INNER JOIN products ON products.id = order_items.product_id
	WHERE
		users.email = $1
	`

	rows, err := oi.DB.QueryContext(ctx, query, userEmail)
	if err != nil {
		return nil, err
	}

	orderUsers := []*OrdersByUser{}

	for rows.Next() {
		orderUser := new(OrdersByUser)

		err := rows.Scan(
			&orderUser.Name,
			&orderUser.Email,
			&orderUser.Phone,
			&orderUser.ProductName,
			&orderUser.ProductCode,
			&orderUser.ProductPrice,
			&orderUser.OrderDate,
			&orderUser.Quantity,
		)
		if err != nil {
			return nil, err
		}

		orderUsers = append(orderUsers, orderUser)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return orderUsers, nil
}
