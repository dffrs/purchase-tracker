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
		v1.PUT("/order/:user_id", app.createOrder)
		v1.GET("/order/:user_id", app.getOrdersByUserID)
		v1.GET("/order/:order_date")
	}

	return g
}
