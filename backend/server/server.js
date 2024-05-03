const express = require("express");
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db.config');
const dotenv = require('dotenv');

const loginRoute = require('./routes/users/userLogin');
const getAllUsersRoute = require('./routes/users/userGetAllUsers');
const registerRoute = require('./routes/users/userSignUp');
const getUserByIdRoute = require('./routes/users/userGetUserById');

const editUserRoute = require('./routes/users/userEditUser');
const deleteAll = require('./routes/users/userDeleteAll');


const createProfileRoute = require('./routes/users/userProfile');

const getProfileRoute = require('./routes/users/userGetProfile');


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

const editProfileRoute = require('./routes/users/userProfileUpdate');

const recipeSearchRoute = require('./routes/recipes/recipeSearch');

const fetchUserProfile = require('./routes/users/userGetProfile');

const deleteUser = require('./routes/users/userDeleteAll');


const fileUploadRoute = require('./routes/images/fileUpload');

const getCommentById = require('./routes/comments/commentGetById');

const commentGetAllComments = require('./routes/comments/commentGetAllComments');

const deleteCommentById = require('./routes/comments/commentDeleteById');



dotenv.config();

const SERVER_PORT = process.env.PORT || 8081;

dbConnection();
app.use(cors());
app.use(express.json());


app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', getProfileRoute);

app.use('/user', deleteUser);

app.use('/user', editUserRoute);

app.use('/user',fetchUserProfile);

app.use('/user', createProfileRoute);

app.use('/recipe', recipeSearchRoute);


app.use('/user', editProfileRoute);


app.use('/comment', addCommentRoute);
app.use('/comment', getAllCommentsRoute);
app.use('/comment', editCommentRoute);


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

app.use('/comment', getCommentById);

app.use('/comment', commentGetAllComments);

app.use('/file', fileUploadRoute);


app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
