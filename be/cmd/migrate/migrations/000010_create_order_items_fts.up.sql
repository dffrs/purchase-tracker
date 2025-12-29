CREATE VIRTUAL TABLE order_items_fts USING fts5(
  user_name,
  user_email,
  user_phone,
  product_name,
  product_code,
  product_rrp,
  product_wsp,
  order_date,
  quantity,
  rrp_at_purchase,
  wsp_at_purchase,
);

-- triggers (only INSERT for now)
CREATE TRIGGER order_items_ai AFTER INSERT ON order_items
BEGIN
  INSERT INTO order_items_fts (
    rowid,
    user_name,
    user_email,
    user_phone,
    product_name,
    product_code,
    product_rrp,
    product_wsp,
    order_date,
    quantity,
    rrp_at_purchase,
    wsp_at_purchase
  )

	SELECT 
    new.id,
		users.name,
		users.email,
		users.phone,
		products.name,
		products.code,
		products.rrp,
		products.wsp,
    orders.order_date,
		new.quantity,
		new.rrp_at_purchase,
		new.wsp_at_purchase
	FROM
		users
		JOIN orders ON orders.user_id = users.id
		JOIN products ON products.id = new.product_id
  WHERE
    orders.id = new.order_id;
END;
