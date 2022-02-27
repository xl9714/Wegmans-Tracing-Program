const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries.js')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/productsScanHist/:id', db.getScanHist)
app.get('/productsInfo/:id', db.getProductInfo)
app.put('/recall/:id', db.UpdateRecall)
app.put('/scan/:id', db.UpdateScan)

app.listen(port, () => {
    console.log('App runing on port 3000!')
})