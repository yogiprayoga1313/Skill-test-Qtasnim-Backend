const db= require('../helpers/db.helpers')

exports.findAllProducts = async function (page, search, sort, sortBy,limit) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit

  const query = `
  SELECT product.*, type_products.name_type_product, stok.quantity
  FROM "product"
  JOIN "type_products" ON product.type_id = type_products.id
  LEFT JOIN (
      SELECT product_id, SUM(quantity) AS quantity
      FROM "stok"
      GROUP BY product_id
  ) AS stok ON product.id = stok.product_id
  WHERE product.name_product LIKE $3
  ORDER BY "${sort}" ${sortBy} LIMIT $1  OFFSET $2
`;

  const values = [limit,offset,`%${search}%`]
  const { rows } = await db.query(query, values)
  return rows
}


exports.findOne = async function (id) {
  const query = `
SELECT  * FROM "product" WHERE id=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.insert = async function (data) {
  const query = `
INSERT INTO "product" ("name_product", "type_id") 
VALUES ($1,$2) RETURNING *
`
  const values = [data.name_product, data.type_id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.findOne = async function (id) {
  const query = `
SELECT  * FROM "product" WHERE id=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.destroy = async function (id) {
  const query = `
DELETE FROM "product" WHERE "id"=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.updateStock = async function (product_id, new_stock) {
  const query = `
      UPDATE product
      SET stock = $1
      WHERE id = $2
      RETURNING *
  `;
  const values = [new_stock, product_id];

  try {
      const updatedProduct = await db.query(query, values);
      return updatedProduct.rows[0];
  } catch (error) {
      throw error;
  }
}