const multer = require('multer');
const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const addCommentRoute = require('./routes/commentCreateComment')
const getAllCommentsRoute = require('./routes/commentGetAllComments')
const editCommentRoute  = require('./routes/commentEditComment')

// Import recipe routes
const recipeCreateRoute = require('./routes/recipeCreate'); // Updated route name
const recipeEditRoute = require('./routes/recipeEdit'); // Updated route name
const recipeDeleteRoute = require('./routes/recipeDelete'); // Updated route name
const recipeGetAllRoute = require('./routes/recipeGetAll'); // Updated route name



require('dotenv').config();



const SERVER_PORT = 8081
 
dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/comment', getAllCommentsRoute)
app.use('/comment',addCommentRoute)
app.use('/comment', editCommentRoute)

//app.use for recipes

// Recipe routes
app.use('/recipe', recipeCreateRoute);
app.use('/recipe', recipeEditRoute);
app.use('/recipe', recipeDeleteRoute);
app.use('/recipe', recipeGetAllRoute);


// Root route handler
app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})