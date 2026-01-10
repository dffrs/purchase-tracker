package main

import (
	"errors"
	"fmt"
	"net/http"
	"purchase-tracker/internal/database"
	m "purchase-tracker/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (app *application) createOrderItems(c *gin.Context) {
	orderItemPayload := new(m.OrderPayload)

	if err := c.ShouldBindJSON(orderItemPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind order item"})
		return
	}

	// -------------- user related --------------
	dbCountryID, err := app.models.Country.GetOrCreate(orderItemPayload.User.Address.City.Country.Code, orderItemPayload.User.Address.City.Country.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbCityID, err := app.models.City.GetOrCreate(orderItemPayload.User.Address.City.Name, orderItemPayload.User.Address.City.ZipCode, &dbCountryID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbAddressID, err := app.models.Address.GetOrCreate(orderItemPayload.User.Address.Street, orderItemPayload.User.Address.StreetNumber, orderItemPayload.User.Address.Apartment, &dbCityID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbUserID, err := app.models.Users.GetOrCreate(&orderItemPayload.User.Name, &orderItemPayload.User.Email, &orderItemPayload.User.Phone, &dbAddressID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// -------------- payment related --------------
	dbPaymentID, err := app.models.Payment.GetOrCreate(&orderItemPayload.Payment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// -------------- delivery related --------------
	dbDeliveryID, err := app.models.Delivery.GetOrCreate(&orderItemPayload.Delivery)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// -------------- create order --------------
	order := &database.Order{UserID: dbUserID, PaymentID: dbPaymentID, DeliveryID: dbDeliveryID, OrderDate: orderItemPayload.CreatedAt}
	err = app.models.Orders.Insert(order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// -------------- product related --------------
	for _, product := range orderItemPayload.Products {
		dbProductID, err := app.models.Products.GetOrCreate(product.Name, product.Code, product.RRP, product.WSP)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		orderItem := &database.OrdersItem{Quantity: product.Quantity, OrderID: order.ID, ProductID: dbProductID, RRPAtPurchase: product.RRP, WSPAtPurchase: product.WSP}
		err = app.models.OrdersItems.Insert(orderItem)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// TODO: return some model
	c.JSON(http.StatusOK, nil)
}

func (app *application) getAllOrderItems(c *gin.Context) {
	orderItems, err := app.models.OrdersItems.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get all order items: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, orderItems)
}

func (app *application) getOrderItemsStats(c *gin.Context) {
	yearPayload := new(m.YearPayload)

	if err := c.ShouldBindJSON(yearPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind year value"})
		return
	}

	orderItemsStats, err := app.models.OrdersItems.GetAllStats(yearPayload.Year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get stats for all ordered items: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, orderItemsStats)
}

func (app *application) getOrderItemsStatsForYear(c *gin.Context) {
	yearPayload := new(m.YearPayload)

	if err := c.ShouldBindJSON(yearPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind year value"})
		return
	}

	orderItemsYearStats, err := app.models.OrdersItems.GetAllStatsForYear(yearPayload.Year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get stats for all ordered items for year: %s. %s", yearPayload.Year, err.Error())})
		return
	}

	profits := make([]float64, 12)

	for _, v := range orderItemsYearStats {
		month, err := strconv.Atoi(v.Month)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to convert month to int: %s", err.Error())})
			return
		}

		if month-1 > len(profits) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to add month: %s", errors.New("index out of bounds"))})
			return
		}

		profits[month-1] = v.Profit
	}

	c.JSON(http.StatusOK, profits)
}

func (app *application) searchOrderItems(c *gin.Context) {
	searchPayload := new(m.SearchPayload)

	if err := c.ShouldBindJSON(searchPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind search value"})
		return
	}

	orderItems, err := app.models.OrdersItems.FindBy(searchPayload.Search)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to search for %s: %s", searchPayload.Search, err.Error())})
		return
	}

	c.JSON(http.StatusOK, orderItems)
}
