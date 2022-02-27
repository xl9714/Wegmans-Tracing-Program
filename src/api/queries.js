const { response } = require('express')
const { request } = require('http')
const { parseComplete } = require('pg-protocol/dist/messages')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'WegTrace',
  password: '',
  port: 5432,
})

//Get for food safety and inspection service
const getScanHist = (request, response) => {
    const product_id = parseComplete(request.params.product_id)

    pool.query(
        `SELECT * FROM scan WHERE product_id = ${product_id}`, [product_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Get for customer
const getProductInfo = (request, response) => {
    const product_id = parseComplete(request.params.product_id)

    pool.query(
    `SELECT product_name, temperature, expiration_date, recall FROM product p, product_safety ps WHERE product_id = ${product_id}`, 
        [product_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Update recall
const UpdateRecall = (request, response) => {
    const product_id = parseComplete(request.params.product_id)

    pool.query(
        `UPDATE product_safety SET recall = true WHERE product_id = ${product_id}`,
        [product_id], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).send(`User updated with ID: ${product_id}`)
        }
    )
}

//Update when store organizer and cashier scan
const UpdateScan = (request, response) => {
    const product_id = parseComplete(request.params.product_id)
    const {user_id, location, date, time, distributor} = request.body

    Pool.query(
        `UPDATE scan SET user_id = ${user_id}, location = ${location}, date = ${date}, time = ${time}, distributor = ${distributor} WHERE product_id = ${product_id}`,
        [product_id, user_id, location, date, time, distributor], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).send(`User updated with ID: ${product_id}`)
        }
    )
}

module.exports = {
    getScanHist,
    getProductInfo,
    UpdateRecall,
    UpdateScan,
}