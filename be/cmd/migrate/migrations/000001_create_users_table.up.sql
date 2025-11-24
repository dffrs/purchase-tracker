CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone INTEGER NOT NULL UNIQUE,
  address_id INTEGER, -- users might not need to have an address
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (address_id) REFERENCES address (id) ON DELETE CASCADE
);
