// Index, GET /pokemon
app.get()
// Show, GET /pokemon/:id

// New, GET /pokemon/new

// Edit, GET /pokemon/:id/edit

// Create, POST /pokemon

// Update, PUT /pokemon/:id

// Destroy, DELETE /pokemon/:id

app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT}`)
})