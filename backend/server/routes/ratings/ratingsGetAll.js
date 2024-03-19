const express = require("express");
const router = express.Router();
//import ratings
const ratingModel = require("../../models/ratingModel");

router.get('/getAll', async(req,res) =>{
    //fetch all ratings
    const rating = await ratingModel.find();
    return res.json(rating);
});

module.exports = router;