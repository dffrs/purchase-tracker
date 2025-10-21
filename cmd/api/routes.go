package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) routes() http.Handler {
	g := gin.Default()

	v1 := g.Group("/api/v1")
	{
		v1.GET("/user", app.getAllUsers)
		v1.GET("/user/:id", app.getUser)
		v1.PUT("/user/:id", app.updateUser)
		v1.POST("/user", app.createUser)
		v1.DELETE("/user/:id", app.deleteUser)
	}

	return g
}
