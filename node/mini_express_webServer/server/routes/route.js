const express = require('express');
const LikeMovies = require('../model/userLikeMovies');
const router = express.Router();

// Rest LikeMovies API

router.get('/getAllMovies',  async (req, res) => {
    const movies = await LikeMovies.find().sort({ update_at: -1 });
    
    res.json({
        code: 200,
        msg: 'succesks',
        data: movies
    })
})
router.get('/getAllMovie/:id', async (req, res) => {
    const movies =  await LikeMovies.findById({_id:req.params.id});

    res.json({
        code: 200,
        msg: 'success',
        data: movies
    })
})
router.post("/addUserLike", (req, res) => {
    try {
        const movie = LikeMovies.create(req.body) 
        res.json({
            code: 200,
            msg: 'success'
        })
    } catch (e) {
        console.log(e)
    }
    
})
router.put('/getAllMovie/:id', async (req, res) => {
    const movies = await LikeMovies.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }, () => {
            console.log(req.body)
        }
    );
    res.json({
        code: 200,
        msg: 'success',
        body:req.body
    })
})
router.delete('/getAllMovie/:id', async (req, res) => {
    const temp = await LikeMovies.findOneAndRemove({_id: req.params.id})
    res.json({
        code: 200,
        msg: 'success'
    })
})
module.exports = router;