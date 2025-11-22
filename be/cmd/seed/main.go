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

	// insert country, city & address data
	countryIDs := insertMockCountries(db, 5)
	cityIDs := insertMockCities(db, 15, countryIDs)
	addressIDs := insertMockAddresses(db, 30, cityIDs)

	// Insert users data
	userIDs := insertMockUsers(db, 10, addressIDs)

	// Insert products data
	productIDs := insertMockProducts(db, 20)
	insertMockOrders(db, userIDs, productIDs, 15)

	fmt.Println("Mock data inserted successfully!")
}

func insertMockCountries(db *sql.DB, count int) []int {
	stmt := `INSERT INTO country (code, name) VALUES (?, ?)`

	ids := make([]int, count)

	for i := 0; i < count; i++ {
		code := gofakeit.CountryAbr() // "PT"
		name := gofakeit.Country()

		res, err := db.Exec(stmt, code, name)
		if err != nil {
			log.Fatal("insert country:", err)
		}

		id, _ := res.LastInsertId()
		ids = append(ids, int(id))
	}

	fmt.Printf("Inserted %d countries\n", count)
	return ids
}

func insertMockCities(db *sql.DB, count int, countryIDs []int) []int {
	stmt := "INSERT INTO city (name, zip_code, country_id) VALUES (?, ?, ?)"

	ids := make([]int, count)

	for i := 0; i < count; i++ {
		countryID := countryIDs[rand.Intn(len(countryIDs))]

		name := gofakeit.City()
		zipCode := gofakeit.Zip()

		res, err := db.Exec(stmt, name, zipCode, countryID)
		if err != nil {
			log.Fatal("insert city:", err)
		}

		id, _ := res.LastInsertId()
		ids = append(ids, int(id))
	}

	fmt.Printf("Inserted %d cities\n", count)
	return ids
}

func insertMockAddresses(db *sql.DB, count int, cityIDs []int) []int {
	stmt := "INSERT INTO address (street, street_number, apartment, city_id) VALUES (?, ?, ?, ?)"

	ids := make([]int, count)

	for i := 0; i < count; i++ {
		cityID := cityIDs[rand.Intn(len(cityIDs))]

		street := gofakeit.Street()
		streetNumber := gofakeit.Number(1, 200)
		apartment := gofakeit.RandomString([]string{"A", "B", "C", "D", ""})

		res, err := db.Exec(stmt, street, streetNumber, apartment, cityID)
		if err != nil {
			log.Fatal("insert address:", err)
		}

		id, _ := res.LastInsertId()
		ids = append(ids, int(id))
	}

	fmt.Printf("Inserted %d addresses\n", count)
	return ids
}

func insertMockUsers(db *sql.DB, count int, addressIDs []int) []int {
	stmt := `INSERT INTO users (name, email, phone, address_id) VALUES (?, ?, ?, ?)`

	var ids []int

	for range count {
		addressID := addressIDs[rand.Intn(len(addressIDs))]

		res, err := db.Exec(stmt,
			gofakeit.Name(),
			gofakeit.Email(),
			gofakeit.Number(900000000, 999999999), // random phone
			addressID,
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
