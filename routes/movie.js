const express= require("express");
const router= express.Router()
const Movie = require("../models/movie")


router.get("/add", (req,res)=>{
    res.render("addMovie")
})

router.post("/add", (req,res)=>{
    var newMovie={name: req.body.name, description: req.body.description, duration: req.body.duration, direction: req.body.direction}
    Movie.create(newMovie, (err,result)=>{
        if(err){
            console.log(err)
            res.redirect("/movie/add")
        }
        else{
            console.log(result)
            res.render("index")
        }
    })
})

router.get("/search", (req,res)=>{
    res.render("index")
})

router.post("/result", (req,res)=>{
    movieName=req.body.search
    console.log(req.body)
    Movie.find({"name": { $regex: movieName, $options: 'i' }}, function(err,foundMovie){
        if(err){
            console.log(err)
        }
        else{
            console.log(foundMovie)
            res.render("result", {movie: foundMovie})
        }
    })
})

router.get("/dashboard", (req,res)=>{
    Movie.find({}, (err,allMovie)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render("dashboard", {movie: allMovie})
        }
    })
})

router.post("/dashboard/:id", (req,res)=>{
    Movie.findByIdAndUpdate({_id: req.params.id}, req.body.movie, function(err, updatedMovie){
        if(err){
            console.log(err)
        }
        else{
            console.log(updatedMovie)
            res.redirect("/movie/dashboard")
        }
    })
})
router.get("/dashboard/:id", (req,res)=>{
    Movie.findById({_id: req.params.id},function(err, foundMovie){
        if(err){
            console.log(err)
        }
        else{
            // console.log(updatedMovie)
            res.render("extraInfo", {movie: foundMovie})
        }
        })
    })


router.get("/dashboard/timing/:id", (req,res)=>{
    Movie.findById({_id:req.params.id}, (err, foundMovie)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render("addInfo", {movie: foundMovie})
        }
    })
})


module.exports= router;