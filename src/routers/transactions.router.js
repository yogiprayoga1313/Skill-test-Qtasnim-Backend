const transactionsRouter = require("express").Router()

const transactionsController = require("../contorllers/transactions.controller")

transactionsRouter.get("/", transactionsController.getTransactions)
transactionsRouter.post("/", transactionsController.createTransaction)
// transactionsRouter.delete("/:id", transactionsController.deleteTransactions)

module.exports = transactionsRouter