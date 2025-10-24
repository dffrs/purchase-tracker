package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) routes() http.Handler {
	g := gin.Default()

	v1 := g.Group("/api/v1")
	{
		// users
		v1.GET("/users", app.getAllUsers)
		v1.GET("/user/:id", app.getUser)
		v1.PUT("/user/:id", app.updateUser)
		v1.POST("/user", app.createUser)
		v1.DELETE("/user/:id", app.deleteUser)

		// products
		v1.GET("/products", app.getAllProducts)
		v1.GET("/product/:id", app.getProduct)
		v1.PUT("/product/:id", app.updateProduct)
		v1.POST("/product", app.createProduct)
		v1.DELETE("/product/:id", app.deleteProduct)

		// orders
		v1.GET("/orders", app.getAllOrders)
		v1.GET("/order/user/:user_id", app.getOrdersByUserID)
		v1.GET("/order/:id", app.getOrder)
		v1.PUT("/order/:id", app.updateOrder)
		v1.POST("/order/user/:user_id", app.createOrder)
		v1.DELETE("/order/:id", app.deleteOrder)

		// order items
		v1.POST("/orderItems", app.createOrderItems)
		v1.GET("/orderItems/:order_item_id", app.getOrderItems)
		v1.GET("/orderItems/order/:order_id", app.getOrderItemsByOrderID)
		v1.GET("/orderItems/product/:product_id", app.getOrderItemsByProductID)
		v1.GET("/orderItems/user/:user_id", app.getOrderItemsByUserID)
	}

	return g
}
