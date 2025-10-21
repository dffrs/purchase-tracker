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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	user := &User{}

	query := "SELECT * FROM users WHERE id = $1"

	err := u.DB.QueryRowContext(ctx, query, userID).Scan(user.ID, user.Name, user.Email, user.Phone, user.CreatedAt)
	if err != nil {
		// no rows ?
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, err
	}

	return user, nil
}

func (u *UsersModel) GetAll() ([]*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM users"

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

func (u *UsersModel) Update(user *User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4"

	_, err := u.DB.ExecContext(ctx, query, user.Name, user.Email, user.Phone, user.ID)
	if err != nil {
		return err
	}

	return nil
}

func (u *UsersModel) Delete(userID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "DELETE FROM users WHERE id = $1"

	_, err := u.DB.ExecContext(ctx, query, userID)
	if err != nil {
		return err
	}

	return nil
}
