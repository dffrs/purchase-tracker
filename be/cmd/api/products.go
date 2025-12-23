package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) getAllProducts(c *gin.Context) {
	products, err := app.models.Products.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get all products: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, products)
}
