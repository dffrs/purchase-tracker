package main

import (
	"fmt"
	"net/http"
	"purchase-tracker/internal/database"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (app *application) createOrder(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get user ID"})
		return
	}

	user, err := app.models.Users.Get(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to user with id: %d", userID)})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with '%d' not found", userID)})
		return
	}

	order := new(database.Order)

	if err := c.ShouldBindJSON(order); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to bind order"})
	}

	err = app.models.Orders.Insert(order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	c.JSON(http.StatusOK, order)
}

func (app *application) getOrdersByUserID(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get user ID"})
		return
	}

	user, err := app.models.Users.Get(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to user with id: %d", userID)})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with '%d' not found", userID)})
		return
	}

	orders, err := app.models.Orders.GetOrdersByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get orders from user: %d", userID)})
		return
	}

	c.JSON(http.StatusOK, orders)
}
