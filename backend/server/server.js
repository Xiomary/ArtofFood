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
const recipeDeleteRoute = require('./routes/recipes/recipeDelete');
const recipeGetAllRoute = require('./routes/recipes/recipeGetAll');
const recipeOwner = require('./routes/recipes/recipeOwner');
const recipeGetByIdRoute = require('./routes/recipes/recipeGetRecipeById');
const recipeUpdateRoute = require('./routes/recipes/recipeUpdate');

const ratingCreateRoute = require('./routes/ratings/ratingCreateRating');
const ratingGetAllRoute = require('./routes/ratings/ratingsGetAll');
const ratingAverageRoute = require('./routes/ratings/calculateAverageRating');
const ratingEditRoute = require('./routes/ratings/ratingEditRating');
const ratingCheckUserRating = require('./routes/ratings/ratingCheckUserRating');

//file upload
const fileUploadRoute = require('./routes/images/fileUpload');


//rating check user rating

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
app.use('/recipe', recipeDeleteRoute);
app.use('/recipe', recipeGetAllRoute);
app.use('/recipe', recipeGetByIdRoute);
app.use('/recipe', recipeOwner);
app.use('/recipe', recipeUpdateRoute);

//file upload
app.use('/file', fileUploadRoute);

app.use('/ratings', ratingAverageRoute);
app.use('/ratings', ratingCreateRoute);
app.use('/ratings', ratingGetAllRoute);
app.use('/ratings', ratingEditRoute);
app.use('/ratings', ratingCheckUserRating);



app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
