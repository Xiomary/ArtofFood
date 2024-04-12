const express = require("express");
const router = express.Router();
//import ratings
const Rating = require("../../models/ratingModel");

router.get('/getAll', async(req,res) =>{
    //fetch all ratings
    const rating = await Rating.find();
    return res.json(rating);
});

module.exports = router;