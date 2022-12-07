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
let POKEMON = require("./models/pokemon.js")

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

// New, GET /pokemon/new
app.get('/pokemon/new', (req, res) => {
    res.render("new.ejs")
})

// Create, POST /pokemon
app.post('/pokemon', (req, res) => {
    console.log(req.body.name)
    const newPokemon = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.types.split(","),
        stats: {
            hp: req.body.HP,
            attack: req.body.AP,
            defense: req.body.DP
        }
    }
    POKEMON.push(newPokemon)
    res.redirect("/pokemon")
})

// Edit, GET /pokemon/:id/edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render("edit.ejs", {
        pokemon : POKEMON[req.params.id],
        index: req.params.id
    })
})


// Update, PUT /pokemon/:id
app.put('/pokemon/:id', (req, res) => {
    const updatedPokemon = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.types.split(","),
        stats: {
            hp: req.body.HP,
            attack: req.body.AP,
            defense: req.body.DP
        }
    }
    POKEMON[req.params.id] = updatedPokemon
    res.redirect(`/pokemon/${req.params.id}`)
})

// Destroy, DELETE /pokemon/:id
app.delete('/pokemon/:id', (req, res) => {
    POKEMON.splice(req.params.id, 1)
    res.redirect("/pokemon")
})

// Show, GET /pokemon/:id
app.get('/pokemon/:id', (req, res) => {
    console.log(req.params.id)
    console.log(POKEMON[req.params.id])
    res.render("show.ejs", {
        data: POKEMON[req.params.id],
        index: req.params.id
    })
})

//************************* */
// SERVER LISTENER
//************************* */
app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT}`)
})