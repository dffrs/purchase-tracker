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
	ID            int     `json:"id"`
	Quantity      int     `json:"quantity"`
	OrderID       int     `json:"orderId"`
	ProductID     int     `json:"productId"`
	RRPAtPurchase float64 `json:"rrp_at_purchase"`
	WSPAtPurchase float64 `json:"wsp_at_purchase"`
}

type OrdersResponse struct {
	Name          string  `json:"name"`
	Email         string  `json:"email"`
	Phone         int     `json:"phone"`
	ProductName   string  `json:"productName"`
	ProductCode   string  `json:"productCode"`
	ProductRRP    float64 `json:"productRRP"`
	ProductWSP    float64 `json:"productWSP"`
	OrderDate     string  `json:"orderDate"`
	Quantity      int     `json:"quantity"`
	RRPAtPurchase float64 `json:"rrpAtPurchase"`
	WSPAtPurchase float64 `json:"wspAtPurchase"`
}

func (oi *OrderItemsModel) Insert(orderItem *OrdersItem) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO order_items (order_id, product_id, quantity, rrp_at_purchase, wsp_at_purchase) VALUES ($1, $2, $3, $4, $5)"

	result, err := oi.DB.ExecContext(ctx, query, orderItem.OrderID, orderItem.ProductID, orderItem.Quantity, orderItem.RRPAtPurchase, orderItem.WSPAtPurchase)
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

	err := oi.DB.QueryRowContext(ctx, query, orderItemID).Scan(
		&orderItem.ID,
		&orderItem.Quantity,
		&orderItem.OrderID,
		&orderItem.ProductID,
		&orderItem.RRPAtPurchase,
		&orderItem.WSPAtPurchase)
	if err != nil {
		// no rows?
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return orderItem, nil
}

func (oi *OrderItemsModel) GetAll() ([]*OrdersResponse, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := ` 
	SELECT 
		users.name AS name,
		users.email AS email,
		users.phone AS phone,
		products.name AS productName,
		products.code AS productCode,
		products.rrp AS productRRP,
		products.wsp AS productWSP,
		orders.order_date AS orderDate,
		order_items.quantity AS quantity,
		order_items.rrp_at_purchase AS rrpAtPurchase,
		order_items.wsp_at_purchase AS wspAtPurchase
	FROM
		users
		INNER JOIN orders ON orders.user_id = users.id
		INNER JOIN order_items ON order_items.order_id = orders.id
		INNER JOIN products ON products.id = order_items.product_id
	ORDER BY
		orders.order_date DESC
	LIMIT
		100000;
	`

	rows, err := oi.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	orderUsers := []*OrdersResponse{}

	for rows.Next() {
		orderUser := new(OrdersResponse)

		err := rows.Scan(
			&orderUser.Name,
			&orderUser.Email,
			&orderUser.Phone,
			&orderUser.ProductName,
			&orderUser.ProductCode,
			&orderUser.ProductRRP,
			&orderUser.ProductWSP,
			&orderUser.OrderDate,
			&orderUser.Quantity,
			&orderUser.RRPAtPurchase,
			&orderUser.WSPAtPurchase,
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

func (oi OrderItemsModel) FindBy(search string) ([]*OrdersResponse, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM order_items_fts WHERE order_items_fts MATCH ?"

	rows, err := oi.DB.QueryContext(ctx, query, search)
	if err != nil {
		return nil, err
	}

	ordersSearch := []*OrdersResponse{}

	for rows.Next() {
		orSearch := new(OrdersResponse)

		err := rows.Scan(
			&orSearch.Name,
			&orSearch.Email,
			&orSearch.Phone,
			&orSearch.ProductName,
			&orSearch.ProductCode,
			&orSearch.ProductRRP,
			&orSearch.ProductWSP,
			&orSearch.OrderDate,
			&orSearch.Quantity,
			&orSearch.RRPAtPurchase,
			&orSearch.WSPAtPurchase,
		)
		if err != nil {
			return nil, err
		}

		ordersSearch = append(ordersSearch, orSearch)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return ordersSearch, nil
}
