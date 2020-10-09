const express= require("express");
const router= express.Router()
const User = require("../models/user")
const passport = require("passport");

//Landing Page
router.get("/", (req,res)=>{
    User.find({rights:'on'}, function(err, result){
        // console.log(result.len)
        if(err){
            console.log()
        }
        if(!result.len){
            res.redirect("/signup")
        }
        else{
            res.redirect("/login")
        }
    } )
})

//Home page once authenticated
router.get("/home", function(req,res){
    res.render("index")
} )

//Login Page
router.get("/login", function(req,res){
    res.render("login")
})

//Signup page
router.get("/signup", function(err,res){
    res.render("signup")
})

//Signup logic
router.post("/signup", function(req,res){
    if(req.body.admin){
        var newUser= new User({username: req.body.username, rights:req.body.admin})
        User.register(newUser, req.body.password, (err, result)=>{
            if(err){
                console.log(err)
                return redirect("/login")
            }
            else{
                passport.authenticate("local")(req, res, function(){
                })
                res.redirect("/home")

            }

        })
    }
    else{
        var newUser= new User({username: req.body.username, rights: 'off'})
        User.register(newUser, req.body.password, (err,result)=>{
            if(err){
                console.log(err)
                return redirect("/login")
            }
            else{
                passport.authenticate("local")(req, res, function(){
                })
                res.redirect("/home")

            }

        })
    }
})




//Login logic
router.post("/login", passport.authenticate("local",{
    successRedirect: '/home',
    failureRedirect: '/login'
}), (req,res)=>{
    // console.log(req.body)
})

//Logout logic

router.get("/logout", (req,res)=>{
    req.logout()
    res.redirect("/login")
})



module.exports = router;