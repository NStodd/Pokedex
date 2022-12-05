//************************* */
// DEPENDENCIES
//************************* */
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
require("dotenv").config()


//************************* */
// GLOBAL VARIABLES
//************************* */
const PORT = process.env.PORT || 3210
const POKEMON = require("./models/pokemon.js")

//************************* */
// EXPRESS OBJECT
//************************* */
const app = express()

//************************* */
// MIDDLEWARE
//************************* */
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/static", express.static("public"))
app.use(morgan("tiny"))

//************************* */
// ROUTES
//************************* */

// Home Route
app.get('/', (req, res) => {
    console.log(POKEMON)
    res.redirect("/pokemon")
})

// Index, GET /pokemon
app.get('/pokemon', (req, res) => {
    res.render("index.ejs", {
        data: POKEMON
    })
})

// Show, GET /pokemon/:id
app.get('/pokemon/:id', (req, res) => {
    res.render("show.ejs", {
        data: Pokemon[req.params.id]
    })
})

// New, GET /pokemon/new
app.get('/pokemon/new', (req, res) => {

})

// Edit, GET /pokemon/:id/edit
app.get('/pokemon/:id/edit', (req, res) => {

})

// Create, POST /pokemon
app.post('/pokemon')

// Update, PUT /pokemon/:id
app.put('/pokemon/:id')

// Destroy, DELETE /pokemon/:id
app.delete('/pokemon/:id')

//************************* */
// SERVER LISTENER
//************************* */
app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT}`)
})