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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * from users"

	rows, err := u.DB.QueryContext(ctx, query, nil)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []*User{}

	for rows.Next() {
		user := &User{}

		err := rows.Scan(user.ID, user.Name, user.Email, user.Phone, user.CreatedAt)
		if err != nil {
			return nil, err
		}

		users = append(users, user)

	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UsersModel) Update(userID int) (*User, error) {
	return nil, nil
}

func (u *UsersModel) Delete(userID int) error {
	return nil
}
