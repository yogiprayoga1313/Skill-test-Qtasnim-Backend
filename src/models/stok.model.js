const db= require('../helpers/db.helpers')

exports.findAllStok = async function (page, search, sort, sortBy) {
    page = parseInt(page) || 1
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const query = `
        SELECT stok.*, product.name_product
        FROM "stok"
        JOIN "product" ON stok.product_id = product.id
        WHERE product.name_product ILIKE $1
        ORDER BY "${sort}" ${sortBy}
    `
    const values = [`%${search}%`]

    const { rows } = await db.query(query, values)
    return rows
}


exports.findOne = async function (id) {
    const query = `
SELECT  * FROM "stok" WHERE id=$1
`
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}


exports.destroy = async function (id) {
    const query = `
DELETE FROM "stok" WHERE "id"=$1
`
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
  INSERT INTO "stok" ("product_id", "quantity") 
  VALUES ($1,$2) RETURNING *
  `
    const values = [data.product_id, data.quantity]
    const { rows } = await db.query(query, values)
    return rows[0]
  }

exports.update = async function (id, data) {
    const query = `
UPDATE "stok" 
SET "quantity"=$2
WHERE "id"=$1
RETURNING *
`
    const values = [id, data.quantity]
    const { rows } = await db.query(query, values)
    return rows[0]
}