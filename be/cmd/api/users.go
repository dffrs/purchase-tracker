package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"purchase-tracker/internal/database"
	m "purchase-tracker/internal/models"
	"strconv"

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

func (app *application) getUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid user id: %s", err.Error())})
		return
	}

	user, err := app.models.Users.Get(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get user: %s", err.Error())})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (app *application) createUser(c *gin.Context) {
	user := m.UserResponse{}

	country := database.Country{}
	city := database.City{}
	address := database.Address{}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// add country if it does not exist. TODO: Get(c *Country) ??
	dbCountry, err := app.models.Country.GetByName(user.Address.City.Country.Name)
	if dbCountry == nil && err == nil {
		country = database.Country{Code: user.Address.City.Country.Code, Name: user.Address.City.Country.Name}
		app.models.Country.Insert(&country)
	}

	// add city if it does not exist
	dbCity, err := app.models.City.GetByName(user.Address.City.Name)
	if dbCity == nil && err == nil {
		city = database.City{Name: user.Address.City.Name, ZipCode: user.Address.City.ZipCode, CountryID: country.ID}
		app.models.City.Insert(&city)
	}

	// add address if it does not exist
	dbAddress, err := app.models.Address.GetByName(user.Address.City.Name)
	if dbAddress == nil && err == nil {
		address = database.Address{Street: user.Address.Street, StreetNumber: user.Address.StreetNumber, Apartment: user.Address.Apartment, CityID: city.ID}
		app.models.Address.Insert(&address)
	}

	dbUser := database.User{Name: user.Name, Email: user.Email, Phone: user.Phone, AddressID: address.ID}

	err = app.models.Users.Insert(&dbUser)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusCreated, &dbUser)
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusCreated, dbUser)
}

func (app *application) updateUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid user id: %s", err.Error())})
		return
	}

	existingUser, err := app.models.Users.Get(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get user: %s", err.Error())})
		return
	}

	if existingUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	updatedUser := &database.User{}

	if err := c.ShouldBindJSON(updatedUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to bind user: %s", err.Error())})
		return
	}

	updatedUser.ID = id

	if err := app.models.Users.Update(updatedUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to update user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, updatedUser)
}

func (app *application) deleteUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid user id: %s", err.Error())})
		return
	}

	err = app.models.Users.Delete(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("Failed to get user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
