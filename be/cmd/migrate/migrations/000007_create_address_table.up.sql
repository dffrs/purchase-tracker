CREATE TABLE IF NOT EXISTS address (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  street TEXT NOT NULL,
  street_number TEXT,
  apartment TEXT,
  city_id INTEGER NOT NULL,
  FOREIGN KEY (city_id) REFERENCES city(id),
  UNIQUE(street, street_number, apartment, city_id)
);
