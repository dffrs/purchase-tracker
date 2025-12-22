package database

import "database/sql"

type Models struct {
	Users       UsersModel
	Country     CountryModel
	City        CityModel
	Address     AddressModel
	Products    ProductsModel
	Orders      OrdersModel
	Delivery    DeliveryModel
	Payment     PaymentModel
	OrdersItems OrderItemsModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Users:       UsersModel{DB: db},
		Country:     CountryModel{DB: db},
		City:        CityModel{DB: db},
		Address:     AddressModel{DB: db},
		Products:    ProductsModel{DB: db},
		Orders:      OrdersModel{DB: db},
		Delivery:    DeliveryModel{DB: db},
		Payment:     PaymentModel{DB: db},
		OrdersItems: OrderItemsModel{DB: db},
	}
}
