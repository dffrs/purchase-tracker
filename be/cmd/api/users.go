package main

import (
	"fmt"
	"net/http"
	"purchase-tracker/internal/database"
	m "purchase-tracker/internal/models"

	"github.com/gin-gonic/gin"
)

func (app *application) getAllUsers(c *gin.Context) {
	users, err := app.models.Users.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get all users: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, users)
}

func (app *application) createUser(c *gin.Context) {
	payloadUser := m.UserResponse{}

	if err := c.ShouldBindJSON(&payloadUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dbCountryID, err := app.models.Country.GetOrCreate(payloadUser.Address.City.Country.Code, payloadUser.Address.City.Country.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbCityID, err := app.models.City.GetOrCreate(payloadUser.Address.City.Name, payloadUser.Address.City.ZipCode, &dbCountryID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbAddressID, err := app.models.Address.GetOrCreate(payloadUser.Address.Street, payloadUser.Address.StreetNumber, payloadUser.Address.Apartment, &dbCityID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	userToInsert := database.User{Name: payloadUser.Name, Email: payloadUser.Email, Phone: payloadUser.Phone, AddressID: &dbAddressID}
	err = app.models.Users.Insert(&userToInsert)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %s", err.Error())})
		return
	}

	responseUser, err := app.models.Users.Get(userToInsert.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusCreated, responseUser)
}
