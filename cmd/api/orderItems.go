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

func (app *application) getOrderItemsByOrderID(c *gin.Context) {
	orderID, err := strconv.Atoi(c.Param("order_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get order id"})
		return
	}

	// verify that order exists
	order, err := app.models.Orders.Get(orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order"})
		return
	}

	if order == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order with id '%d' not found", orderID)})
		return
	}

	orderItem, err := app.models.OrdersItems.GetByOrderID(orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order item"})
		return
	}

	if orderItem == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order item with order id '%d' not found", orderID)})
		return
	}

	c.JSON(http.StatusOK, orderItem)
}

func (app *application) getOrderItemsByProductID(c *gin.Context) {
	productID, err := strconv.Atoi(c.Param("product_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get order id"})
		return
	}

	// verify that product exists
	product, err := app.models.Products.Get(productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get product"})
		return
	}

	if product == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Product with id '%d' not found", productID)})
		return
	}

	orderItem, err := app.models.OrdersItems.GetByProductID(productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order item"})
		return
	}

	if orderItem == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Order item with product id '%d' not found", productID)})
		return
	}

	c.JSON(http.StatusOK, orderItem)
}

func (app *application) getOrderItemsByUserID(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get user id"})
		return
	}

	user, err := app.models.Users.Get(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with id '%d' not found", userID)})
		return
	}

	ordersByUser, err := app.models.OrdersItems.GetByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order items by user id" + err.Error()})
		return
	}

	if ordersByUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with id '%d' does not have any order items", userID)})
		return
	}

	c.JSON(http.StatusOK, ordersByUser)
}

func (app *application) getOrderItemsByUserEmail(c *gin.Context) {
	userEmail := (c.Param("user_email"))
	if userEmail == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get user email"})
		return
	}

	// TODO: Confirm that user email exists (table user)

	ordersByUser, err := app.models.OrdersItems.GetByUserEmail(userEmail)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order items by user email" + err.Error()})
		return
	}

	if ordersByUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with email '%s' does not have any order items", userEmail)})
		return
	}

	c.JSON(http.StatusOK, ordersByUser)
}
