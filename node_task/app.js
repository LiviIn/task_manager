const express = require('express');
const app = express();

/* ROUTE HANDLERS */


/* LIST ROUTES */


/**
 * GET /lists
 * Purpose: Get all Lists
 */
app.get('/lists', (req, res) =>{
    // we want to return an array of all lists in the database
    res.send('Hello world')
})

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post ('/lists', (req, res) => {
    // we want to create a new list and return the new list document back to the user (which includes the id)
    // the list information (fields) will be passed in via the JSON request body
})

/**
 * PATH /lists/:id
 * Purpose: update a specified list 
 */
app.patch('lists/:id', (req, res) =>{
    // we want to update the specified list (list document with id in the URL) with the new value specified in the JSON body of the request
})

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete('lists/:id', (req, res) =>{
    // We want to delete the specified list (document with id in the URL)
})

app.listen(3000, () =>{
    console.log('Server is listening on port 3000')
})