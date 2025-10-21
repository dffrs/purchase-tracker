package database

import (
	"database/sql"
	"time"
)

type UsersModel struct {
	DB *sql.DB
}

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name" binding:"required"`
	Email     string    `json:"email" binding:"required"`
	Phone     int       `json:"phone" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
}

func (u *UsersModel) Insert(user User) error {
	return nil
}

func (u *UsersModel) Get(userID int) (*User, error) {
	return nil, nil
}

func (u *UsersModel) GetAll() ([]*User, error) {
	return []*User{}, nil
}

func (u *UsersModel) Update(userID int) (*User, error) {
	return nil, nil
}

func (u *UsersModel) Delete(userID int) error {
	return nil
}
