package database

import "database/sql"

type Models struct {
	Users       UsersModel
	Products    ProductsModel
	Orders      OrdersModel
	OrdersItems OrderItemsModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Users:       UsersModel{DB: db},
		Products:    ProductsModel{DB: db},
		Orders:      OrdersModel{DB: db},
		OrdersItems: OrderItemsModel{DB: db},
	}
}
