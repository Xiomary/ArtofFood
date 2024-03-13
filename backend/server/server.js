const express = require("express");
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db.config');
const dotenv = require('dotenv');
//router.use

// Import routes
const loginRoute = require('./routes/users/userLogin');
const getAllUsersRoute = require('./routes/users/userGetAllUsers');
const registerRoute = require('./routes/users/userSignUp');
const getUserByIdRoute = require('./routes/users/userGetUserById');
const editUser = require('./routes/users/userEditUser');
const deleteUser = require('./routes/users/userDeleteAll');

//create comment
const addCommentRoute = require('./routes/comments/commentCreateComment');
const getAllCommentsRoute = require('./routes/comments/commentGetAllComments');
const editCommentRoute = require('./routes/comments/commentEditComment');


const recipeCreateRoute = require('./routes/recipes/recipeCreate');


const recipeEditRoute = require('./routes/recipes/recipeEdit');
const recipeDeleteRoute = require('./routes/recipes/recipeDelete');
const recipeGetAllRoute = require('./routes/recipes/recipeGetAll');

const recipeGetByIdRoute = require('./routes/recipes/recipeGetRecipeById');
const recipeUpdateRoute = require('./routes/recipes/recipeUpdate');

// Import the new rating routes
//create rating oute
//rating create
const ratingCreateRoute = require('./routes/ratings/ratingCreateRating');
dotenv.config();

const SERVER_PORT = process.env.PORT || 8081;

dbConnection();
app.use(cors());
app.use(express.json());

// User routes
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);

// Comment routes
app.use('/comment', addCommentRoute);
app.use('/comment', getAllCommentsRoute);
app.use('/comment', editCommentRoute);

app.use('/recipe', recipeCreateRoute);
app.use('/recipe', recipeEditRoute);
app.use('/recipe', recipeDeleteRoute);
app.use('/recipe', recipeGetAllRoute);
//recipe create


// Define a parameterized route with the ID included
// Use the router with the ID parameter included in the route
app.use('/recipe', recipeGetByIdRoute);

app.use('/recipe', recipeUpdateRoute);

// Rating routes
// Assuming the rating routes are set to handle endpoints like '/:recipeId/rate' and '/:recipeId/ratings'


app.use('/ratings', ratingCreateRoute);


app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
