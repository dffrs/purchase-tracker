package main

import (
	"net/http"
	m "purchase-tracker/internal/models"

	"github.com/gin-gonic/gin"
)

// 1. GetOrCreate User (+ address tree)
// 2. GetOrCreate payment method
// 3. GetOrCreate  delivery method
// 4. Create order
// 5. For each product:
//   - GetOrCreate product by code
//   - Insert order_item with snapshot prices
//
// 6. Return full order (read model)
func (app *application) createOrderItems(c *gin.Context) {
	orderItemPayload := new(m.OrderPayload)

	if err := c.ShouldBindJSON(orderItemPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind order item"})
		return
	}

	c.JSON(http.StatusOK, nil)
}
