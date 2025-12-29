CREATE VIRTUAL TABLE order_items_fts USING fts5(
  order_item_id UNINDEXED,
  order_id UNINDEXED,
  user_name,
  user_email,
  user_phone,
  product_name,
  product_code,
  rrp_at_purchase,
  wsp_at_purchase,
  quantity,
);

-- triggers (only INSERT for now)
CREATE TRIGGER order_items_ai AFTER INSERT ON order_items
BEGIN
  INSERT INTO order_items_fts (
    rowid,
    order_item_id,
    order_id,
    user_name,
    user_email,
    user_phone,
    product_name,
    product_code,
    rrp_at_purchase,
    wsp_at_purchase,
    quantity
  )

	SELECT 
    new.id,
    new.id,
    orders.id AS orderID,
		users.name AS name,
		users.email AS email,
		users.phone AS phone,
		products.name AS productName,
		products.code AS productCode,
		new.rrp_at_purchase AS rrpAtPurchase,
		new.wsp_at_purchase AS wspAtPurchase,
		new.quantity AS quantity
	FROM
		users
		JOIN orders ON orders.user_id = users.id
		JOIN products ON products.id = new.product_id
  WHERE
    orders.id = new.order_id;
END;
