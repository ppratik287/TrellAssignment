const express= require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose")
const path = require('path');
const indexRoutes = require("./routes/index")
const movieRoutes = require("./routes/movie")
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user")
const methodOverride = require("method-override")


const app = express();

app.use(require("express-session")({
    secret: "hello",
    resave : true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });
require('dotenv').config({ path: '.env' });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "./public")))
app.use("/",indexRoutes);
app.use("/movie",movieRoutes);
app.use(methodOverride('_method'))

// app.use(app.router)

mongoURL = process.env.MONGOURL
mongoose.connect(mongoURL, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
	console.log("connected to MongoDB Atlas");
}).catch(err => {
	console.log(err.message);
});


app.listen(process.env.PORT || 3000,  function(){
    console.log("Server has started.")
})