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
//edit user
//edit user
//dit user
const editUserRoute = require('./routes/users/userEditUser');
const deleteAll = require('./routes/users/userDeleteAll');

//create profile
const createProfileRoute = require('./routes/users/userProfile');
//get profile
const getProfileRoute = require('./routes/users/userGetProfile');

//create comment
const addCommentRoute = require('./routes/comments/commentCreateComment');
const getAllCommentsRoute = require('./routes/comments/commentGetAllComments');
const editCommentRoute = require('./routes/comments/commentEditComment');


const recipeCreateRoute = require('./routes/recipes/recipeCreate');
const recipeDeleteRoute = require('./routes/recipes/recipeDelete');
const recipeGetAllRoute = require('./routes/recipes/recipeGetAll');
const recipeGetByIdRoute = require('./routes/recipes/recipeGetRecipeById');
const recipeUpdateRoute = require('./routes/recipes/recipeUpdate');

const ratingCreateRoute = require('./routes/ratings/ratingCreateRating');
const ratingGetAllRoute = require('./routes/ratings/ratingsGetAll');
const ratingAverageRoute = require('./routes/ratings/calculateAverageRating');
const ratingEditRoute = require('./routes/ratings/ratingEditRating');
const ratingCheckUserRating = require('./routes/ratings/ratingCheckUserRating');
//profile update
const editProfileRoute = require('./routes/users/userProfileUpdate');
//recipe search 
const recipeSearchRoute = require('./routes/recipes/recipeSearch');

//fetch user profile
const fetchUserProfile = require('./routes/users/userGetProfile');
//user delete
const deleteUser = require('./routes/users/userDeleteAll');

//file upload
const fileUploadRoute = require('./routes/images/fileUpload');

//get comment bi id
const getCommentById = require('./routes/comments/commentGetById');

const commentGetAllComments = require('./routes/comments/commentGetAllComments');

const deleteCommentById = require('./routes/comments/commentDeleteById');



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
app.use('/user', getProfileRoute);
//delete user
app.use('/user', deleteUser);
//edit user
app.use('/user', editUserRoute);

app.use('/user',fetchUserProfile);
//prfile
app.use('/user', createProfileRoute);

app.use('/recipe', recipeSearchRoute);
//get profile
//profile update
app.use('/user', editProfileRoute);



// Comment routes
app.use('/comment', addCommentRoute);
app.use('/comment', getAllCommentsRoute);
app.use('/comment', editCommentRoute);

//delete comment
app.use('/comment', deleteCommentById);

app.use('/recipe', recipeCreateRoute);
app.use('/recipe', recipeDeleteRoute);
app.use('/recipe', recipeGetAllRoute);
app.use('/recipe', recipeGetByIdRoute);
app.use('/recipe', recipeUpdateRoute);



app.use('/ratings', ratingAverageRoute);
app.use('/ratings', ratingCreateRoute);
app.use('/ratings', ratingGetAllRoute);
app.use('/ratings', ratingEditRoute);
app.use('/ratings', ratingCheckUserRating);

//commeny by id
app.use('/comment', getCommentById);

app.use('/comment', commentGetAllComments);

app.use('/file', fileUploadRoute);


app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
