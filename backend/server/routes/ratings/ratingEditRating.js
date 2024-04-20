const express = require('express');
const router = express.Router();


//import rating model
const Rating = require('../../models/ratingModel');

router.put('/editRating', async(req,res) =>{
    const username = req.user.username;
    const{recipeId, newRating} = req.body;

    try{
        let userRating = await Rating.findOne({username: username, recipeId: recipeId});
        if(!userRating){
            return res.status(404).json({message: 'Rating not found'});
        }

        //update the score
        userRating.score = newRating;
        await userRating.save();

        res.status(200).json({message : 'Rating updated successfully'});

    }catch(error){
        res.status(500).json({message : "Servor error", error:error.message});
    }
});

module.exports = router;