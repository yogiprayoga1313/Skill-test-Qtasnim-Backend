const db= require('../helpers/db.helpers')

exports.findAllTransactions = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit


    const query = `
        SELECT transactions.*, product.name_product
        FROM "transactions"
        LEFT JOIN "product" ON transactions.product_id = product.id
        WHERE product.name_product LIKE $3
        ORDER BY "${sort}" ${sortBy} LIMIT $1  OFFSET $2
    `
    const values = [limit,offset,`%${search}%`]
    const { rows } = await db.query(query, values)
    return rows
}


exports.findOne = async function (id) {
    const query = `
SELECT  * FROM "transactions" WHERE id=$1
`
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
  const query = `
INSERT INTO "transactions" ("product_id", "quantity_sold","date_transaction") 
VALUES ($1,$2,$3) RETURNING *
`
  const values = [data.product_id, data.quantity_sold, data.date_transaction]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.destroy = async function (id) {
    const query = `
DELETE FROM "transactions" WHERE "id"=$1
`
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}