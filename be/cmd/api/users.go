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
	user := m.UserResponse{}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dbCountryID, err := app.models.Country.GetOrCreate(user.Address.City.Country.Code, user.Address.City.Country.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbCityID, err := app.models.City.GetOrCreate(user.Address.City.Name, user.Address.City.ZipCode, &dbCountryID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbAddressID, err := app.models.Address.GetOrCreate(user.Address.Street, user.Address.StreetNumber, user.Address.Apartment, &dbCityID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	userToInsert := database.User{Name: user.Name, Email: user.Email, Phone: user.Phone, AddressID: &dbAddressID}
	err = app.models.Users.Insert(&userToInsert)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %s", err.Error())})
		return
	}

	dbUser, err := app.models.Users.Get(userToInsert.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusCreated, dbUser)
}
