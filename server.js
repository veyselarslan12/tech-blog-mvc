const express = require('express')
const session = require('express-session')
const { Sequelize } = require('sequelize')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

Sequelize.afterSync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening!'))
})