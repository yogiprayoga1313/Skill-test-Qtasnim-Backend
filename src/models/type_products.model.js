const db= require('../helpers/db.helpers')

exports.findAllType_Products = async function (page, search, sort, sortBy) {
    page = parseInt(page) || 1
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const query = `
  SELECT * FROM "type_products"
  ORDER BY "${sort}" ${sortBy} 
  `
    const { rows } = await db.query(query)
    return rows
}

exports.insert = async function (data) {
  const query = `
INSERT INTO "type_products" ("name_type_product") 
VALUES ($1) RETURNING *
`
  const values = [data.name_type_product]
  const { rows } = await db.query(query, values)
  return rows[0]
}


exports.findOne = async function (id) {
  const query = `
SELECT  * FROM "type_products" WHERE id=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.destroy = async function (id) {
  const query = `
DELETE FROM "type_products" WHERE "id"=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.update = async function (id, data) {
  const query = `
UPDATE "type_products" 
SET "name_type_product"=$2
WHERE "id"=$1
RETURNING *
`
  const values = [id, data.name_type_product]
  const { rows } = await db.query(query, values)
  return rows[0]
}
  