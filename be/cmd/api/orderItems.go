package main

import (
	"net/http"
	m "purchase-tracker/internal/models"

	"github.com/gin-gonic/gin"
)

func (app *application) createOrderItems(c *gin.Context) {
	orderItemPayload := new(m.OrderPayload)

	if err := c.ShouldBindJSON(orderItemPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind order item"})
		return
	}

	c.JSON(http.StatusOK, nil)
}
