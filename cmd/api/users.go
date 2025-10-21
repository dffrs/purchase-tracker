package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"purchase-tracker/internal/database"

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
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User not found: %s", err.Error())})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (app *application) createUser(c *gin.Context) {
	user := database.User{}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := app.models.Users.Insert(&user)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusCreated, user)
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %s", err.Error())})
		return
	}

	c.JSON(http.StatusCreated, user)
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
