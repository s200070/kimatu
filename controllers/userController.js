"use strict";

const User = require("../models/user")
const passport = require("passport")
const {check, sanitizeBody, validationResult} = require("express-validator")
const getUserParams = body => {
    return {
        loginId: body.loginId,
        viewName: body.viewName,
        password: body.password
    }
}

module.exports = {
    new: (req, res) => {
        res.render("users/new")
    },
    create: (req, res, next) => {
        if (req.skip) return next()
        const newUser = new User(getUserParams(req.body))
        console.log(getUserParams(req.body))
        User.register(newUser, req.body.password, (error, user) => {
            if (user){
                next()
            } else {
                res.render("users/new")
            }
        })
    },
    login: (req, res) => {
        res.render("users/login")
    },
    logout: (req, res, next) => {
        console.logout()
        req.flash("success", "you have been logged out")
        next()
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "users/login",
        successRedirect: "/"
    }),
    validate: (req, res, next) => {
        sanitizeBody("loginId")
            .trim()
        check("password", "Password cannot be empty").notEmpty()
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.skip = true
            req.flash("error", messages.json(" and "))
            res.locals.redirect = "/users/new"
            next()
        } else {
            res.locals.redirect = "/"
            next()
        }
    },
    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if (redirectPath) res.redirect(redirectPath)
        else next()
    }
}