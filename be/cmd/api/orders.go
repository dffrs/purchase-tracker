package main

import (
	"fmt"
	"net/http"
	"strconv"

	"purchase-tracker/internal/database"

	"github.com/gin-gonic/gin"
)

func (app *application) createOrder(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("user_id"))
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
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with id '%d' not found", userID)})
		return
	}

	order := new(database.Order)

	if err := c.ShouldBindJSON(order); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to bind order"})
		return
	}

	err = app.models.Orders.Insert(order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create order: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, order)
}

func (app *application) getAllOrders(c *gin.Context) {
	orders, err := app.models.Orders.GetAllOrders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get all orders: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, orders)
}

func (app *application) getOrdersByUserID(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("user_id"))
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

func (app *application) getOrder(c *gin.Context) {
	orderID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get order ID"})
		return
	}

	order, err := app.models.Orders.Get(orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order by ID"})
		return
	}

	if order == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order with id '%d' does not exist", orderID)})
		return
	}

	c.JSON(http.StatusOK, order)
}

func (app *application) updateOrder(c *gin.Context) {
	orderID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get order ID"})
		return
	}

	existingOrder, err := app.models.Orders.Get(orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order by ID"})
		return
	}

	if existingOrder == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order with id '%d' does not exist", orderID)})
		return
	}

	updatedOrder := new(database.Order)

	if err := c.ShouldBindJSON(updatedOrder); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to bind order"})
		return
	}

	user, err := app.models.Users.Get(updatedOrder.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Sprintf("Failed to get user with id '%d'", updatedOrder.UserID))
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with id '%d' does not exist", updatedOrder.UserID)})
		return
	}

	updatedOrder.ID = existingOrder.ID

	err = app.models.Orders.Update(updatedOrder)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order"})
		return
	}

	c.JSON(http.StatusOK, updatedOrder)
}

func (app *application) deleteOrder(c *gin.Context) {
	orderID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get order ID"})
		return
	}

	err = app.models.Orders.Delete(orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete order"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
