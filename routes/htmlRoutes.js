var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.render("index", {
            title: "Voluntour - Home"
        });
    });

    //Login in page
    app.get("/login", function(req, res) {
        res.render("login", {
            title: "Voluntour - Login"
        });
    });

    // create account route
    app.get("/create", function(req, res) {
        res.render("createAcct", {
            title: "Voluntour - Create Account"
        });
    });

    //create user profile route
    app.get("/user/profile", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            if (
                req.body.username === dbUser.username &&
                req.body.password === dbUser.password
            ) {
                res.render("userProfile", {
                    title: "Voluntour - User Profile"
                });
            }
        });
    });
    ///cms route
    app.get("/cms", function (req, res) {
        res.render("cms", {
            title: "Voluntour - cms"
        });
    });
///logs route
app.get("/blog", function(req, res){
    res.render("blog", {
        title: "Voluntour - blog"
    });
});

    // create admin profile route
    app.get("/admin/profile", function(req, res) {
        res.render("adminProfile", {
            title: "Voluntour - Admin Profile"
        });
    });

    // Load example page and pass in an example by id
    app.get("/example/:id", function(req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function(
            dbExample
        ) {
            res.render("example", {
                example: dbExample
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};