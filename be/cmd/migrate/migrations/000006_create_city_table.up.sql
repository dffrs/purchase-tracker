CREATE TABLE IF NOT EXISTS city (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country_id INTEGER NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country(id),
  UNIQUE(name, zip_code, country_id)
);
