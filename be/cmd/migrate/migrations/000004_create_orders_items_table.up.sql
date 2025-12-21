CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quantity INTEGER DEFAULT 1,

  rrp_at_purchase DECIMAL(10,2) NOT NULL,
  wsp_at_purchase DECIMAL(10,2) NOT NULL,

  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id)
);
