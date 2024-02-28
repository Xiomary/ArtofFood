const express = require("express");
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db.config');
const dotenv = require('dotenv');

// Import routes
const loginRoute = require('./routes/userLogin');
const getAllUsersRoute = require('./routes/userGetAllUsers');
const registerRoute = require('./routes/userSignUp');
const getUserByIdRoute = require('./routes/userGetUserById');
const editUser = require('./routes/userEditUser');
const deleteUser = require('./routes/userDeleteAll');
const addCommentRoute = require('./routes/commentCreateComment');
const getAllCommentsRoute = require('./routes/commentGetAllComments');
const editCommentRoute = require('./routes/commentEditComment');
const recipeCreateRoute = require('./routes/recipeCreate');
const recipeEditRoute = require('./routes/recipeEdit');
const recipeDeleteRoute = require('./routes/recipeDelete');
const recipeGetAllRoute = require('./routes/recipeGetAll');
const recipeSearchRoute = require('./routes/recipeSearchRoute'); // Import the recipe search route
//recipe by id
const recipeRoutes = require('./routes/recipeGetRecipeById');
const recipeUpdateRoute = require('./routes/recipeUpdate');
dotenv.config();

const SERVER_PORT = 8081;

dbConnection();
app.use(cors({ origin: '*' }));
app.use(express.json());

// User routes
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);

// Comment routes
app.use('/comment', getAllCommentsRoute);
app.use('/comment', addCommentRoute);
app.use('/comment', editCommentRoute);

// Recipe routes
app.use('/recipe', recipeCreateRoute);
app.use('/recipe', recipeEditRoute);
app.use('/recipe', recipeDeleteRoute);
app.use('/recipe', recipeGetAllRoute);
app.use('/recipe', recipeSearchRoute); // Include the recipe search route
app.use('/recipe', recipeRoutes); // Use the imported routes with the correct base path
app.use('/recipe', recipeUpdateRoute);


// Root route handler
app.listen(SERVER_PORT, () => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
});
