package database

import (
	"context"
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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO users (id, name, email, phone, created_at) VALUES ($1, $2, $3, $4, $5)"

	return u.DB.QueryRowContext(ctx, query, user.ID, user.Name, user.Email, user.Phone, time.Now().Unix()).Scan(&user.ID)
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
