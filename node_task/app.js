const express = require('express');
const app = express();
const cors = require('cors');

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser')

// Load in the mongoose models
const { List, Task } = require('./db/models')

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(cors())

/* ROUTE HANDLERS */


/* LIST ROUTES */


/**
 * GET /lists
 * Purpose: Get all Lists
 */
app.get('/lists', (req, res) =>{
    // we want to return an array of all lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post ('/lists', (req, res) => {
    console.log('call a list post function')
    // we want to create a new list and return the new list document back to the user (which includes the id)
    // the list information (fields) will be passed in via the JSON request body
    let title = req.body.title;
    console.log('title: ', title)
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned(incl .id)
        res.status(202).json({
            message: "Create a List",
            result: listDoc
        })
    }).catch((err) =>{
        console.log(err)
        res.status(401).json({
            error: err
        })
    })
})

/**
 * PATH /lists/:id
 * Purpose: update a specified list 
 */
app.patch('lists/:id', (req, res) =>{
    // we want to update the specified list (list document with id in the URL) with the new value specified in the JSON body of the request

    List.findOneAndUpdate({
        _id: req.params.id
    }, { $set: req.body }).then(() =>{
        res.sendStatus(200);
    })
})

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete('lists/:id', (req, res) =>{
    // We want to delete the specified list (document with id in the URL)
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removeListDoc) =>{
        res.send(removeListDoc)
    })
})

/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks that belong to a specific list (specified by listId )
 */
app.get('/lists/:listId/tasks', (req, res) =>{
    // we want to remove all task that to a specific list (specified by listed)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) =>{
        res.send(tasks);
    })
})

app.get('/lists/:listId/tasks/:taskId', (req, res) =>{
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) =>{
        res.send(task);
    })
})


/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a list specified by listId
 */
app.post('/lists/:listId/tasks', (req, res) => {
    // We want to create a new task in a list specified by listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) =>{
        res.send(newTaskDoc);
    })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) =>{
    // We want to update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, { $set: req.body}).then(() =>{
        res.status(200).json({
            message: 'Update Successfully..!'
        });
    })
})

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) =>{
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) =>{
        res.send(removedTaskDoc)
    })
})

/* USER ROUTES */
/**
 * POST/ users
 * Purpose: Sign up
 */
app.post('/users', (req, res) =>{
    // User sign up
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() =>{
        return newUser.createSession();
    }).then((refreshToken) =>{
        // Session created successfully - refreshToken returned,
        // now we generate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) =>{
            // Access auth token generated successfully, now we return an object containing the auth tokens
            return (accessToken,  refreshToken)
        })
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.listen(3000, () =>{
    console.log('Server is listening on port 3000')
})