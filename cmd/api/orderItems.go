package main

import (
	"fmt"
	"net/http"
	"purchase-tracker/internal/database"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (app *application) createOrderItems(c *gin.Context) {
	orderItem := new(database.OrdersItem)

	if err := c.ShouldBindJSON(orderItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind order item"})
		return
	}

	// verify that product exists
	product, err := app.models.Products.Get(orderItem.ProductID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get product id"})
		return
	}

	if product == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Product with id '%d' does not exist", orderItem.ProductID)})
		return
	}

	// verify that order exists
	order, err := app.models.Orders.Get(orderItem.OrderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order id"})
		return
	}

	if order == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order with id '%d' does not exist", orderItem.OrderID)})
		return
	}

	err = app.models.OrdersItems.Insert(orderItem)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order item"})
		return
	}

	c.JSON(http.StatusOK, orderItem)
}

func (app *application) getOrderItems(c *gin.Context) {
	orderItemID, err := strconv.Atoi(c.Param("order_item_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get order item id"})
		return
	}

	orderItem, err := app.models.OrdersItems.Get(orderItemID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order item"})
		return
	}

	if orderItem == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order item with id '%d' not found", orderItemID)})
		return
	}

	c.JSON(http.StatusOK, orderItem)
}
