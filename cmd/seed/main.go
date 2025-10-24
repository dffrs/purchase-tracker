package main

import (
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/brianvoe/gofakeit/v6"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./data.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Seed random generator
	gofakeit.Seed(time.Now().Unix())

	// Insert mock users
	userIDs := insertMockUsers(db, 10)
	productIDs := insertMockProducts(db, 20)
	insertMockOrders(db, userIDs, productIDs, 15)

	fmt.Println("Mock data inserted successfully!")
}

func insertMockUsers(db *sql.DB, count int) []int {
	stmt := `INSERT INTO users (name, email, phone) VALUES (?, ?, ?)`
	var ids []int
	for range count {
		res, err := db.Exec(stmt,
			gofakeit.Name(),
			gofakeit.Email(),
			gofakeit.Number(900000000, 999999999), // random phone
		)
		if err != nil {
			log.Fatal("insert user:", err)
		}
		id, _ := res.LastInsertId()
		ids = append(ids, int(id))
	}
	fmt.Printf("Inserted %d users\n", count)
	return ids
}

func insertMockProducts(db *sql.DB, count int) []int {
	stmt := `INSERT INTO products (name, code, price) VALUES (?, ?, ?)`
	var ids []int
	for range count {
		res, err := db.Exec(stmt,
			gofakeit.ProductName(),
			gofakeit.UUID()[:8], // short unique code
			gofakeit.Price(5, 500),
		)
		if err != nil {
			log.Fatal("insert product:", err)
		}
		id, _ := res.LastInsertId()
		ids = append(ids, int(id))
	}
	fmt.Printf("Inserted %d products\n", count)
	return ids
}

func insertMockOrders(db *sql.DB, userIDs []int, productIDs []int, count int) {
	orderStmt := `INSERT INTO orders (user_id) VALUES (?)`
	itemStmt := `INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)`

	for range count {
		userID := userIDs[rand.Intn(len(userIDs))]
		res, err := db.Exec(orderStmt, userID)
		if err != nil {
			log.Fatal("insert order:", err)
		}
		orderID, _ := res.LastInsertId()

		// Add 1–5 items per order
		numItems := rand.Intn(5) + 1
		for range numItems {
			productID := productIDs[rand.Intn(len(productIDs))]
			qty := rand.Intn(3) + 1
			_, err := db.Exec(itemStmt, orderID, productID, qty)
			if err != nil {
				log.Fatal("insert order item:", err)
			}
		}
	}
	fmt.Printf("Inserted %d orders (with random items)\n", count)
}
