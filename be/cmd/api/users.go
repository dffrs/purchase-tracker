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

	dbUser := database.User{Name: user.Name, Email: user.Email, Phone: user.Phone, AddressID: &dbAddressID}

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
