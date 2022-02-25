const mongoose = require(`mongoose`)
const Thread = require("../models/thread")

module.exports = {
    index: (req, res) => {
        res.render("index")
    },
    categoly: (req, res) => {
        const categoly = req.params.categoly
        res.locals.categoly = categoly
        Thread.find({ categoly: categoly })
            .then(threads => {
                res.locals.threads = threads
                res.render("categoly")
            })
    },
    newTheread: (req, res) => {
        res.locals.categoly = req.params.categoly
        console.log(req.params.categoly)
        res.render("newTheread")
    },
    createThread: (req, res, next) => {
        console.log(req.body.title)
        const params = {
            title:  req.body.title,
            categoly: req.body.categoly
        }
        Thread.create(params)
            .then(() => {
                console.log("successfully create new thread")
                res.locals.redirect = `/${req.params.categoly}`
                next()
            })
            .catch(error => {console.log("error")})
    },
    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if(redirectPath !== undefined) res.redirect(redirectPath)
        else next()
    }
}