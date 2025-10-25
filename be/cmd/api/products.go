package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"purchase-tracker/internal/database"

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

func (app *application) getProduct(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid product id: %s", err.Error())})
		return
	}

	user, err := app.models.Products.Get(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get product: %s", err.Error())})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (app *application) createProduct(c *gin.Context) {
	product := database.Product{}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := app.models.Products.Insert(&product)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusCreated, product)
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create product: %s", err.Error())})
		return
	}

	c.JSON(http.StatusCreated, product)
}

func (app *application) updateProduct(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid product id: %s", err.Error())})
		return
	}

	existingProduct, err := app.models.Products.Get(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get product: %s", err.Error())})
		return
	}

	if existingProduct == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	updatedProduct := &database.Product{}

	if err := c.ShouldBindJSON(updatedProduct); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to bind product: %s", err.Error())})
		return
	}

	updatedProduct.ID = id

	if err := app.models.Products.Update(updatedProduct); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to update product: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, updatedProduct)
}

func (app *application) deleteProduct(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid product id: %s", err.Error())})
		return
	}

	err = app.models.Products.Delete(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Failed to get product: %s", err.Error())})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
