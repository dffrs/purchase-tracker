package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) routes() http.Handler {
	g := gin.Default()

	v1 := g.Group("/api/v1")
	v1.Use(app.corsMiddleware())
	{
		// users
		v1.GET("/users", app.getAllUsers)
		v1.POST("/user", app.createUser)

		// products
		v1.GET("/products", app.getAllProducts)

		// orders
		v1.GET("/orders", app.getAllOrders)
		v1.GET("/order/user/:user_id", app.getOrdersByUserID)
		v1.GET("/order/:id", app.getOrder)
		v1.PUT("/order/:id", app.updateOrder)
		v1.POST("/order/user/:user_id", app.createOrder)
		v1.DELETE("/order/:id", app.deleteOrder)

		// order items
		v1.POST("/orderItems", app.createOrderItems)
	}

	return g
}
