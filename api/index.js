const express = require("express");
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const api = require('./api')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use('/', api)

if (require.main === module) {
    const port = 3001
    app.listen(port, () => {
        console.log(`API server nuxt on port ${port}`)
    })
}

module.exports = app