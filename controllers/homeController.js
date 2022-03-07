const mongoose = require(`mongoose`)
const Thread = require("../models/thread")
const messageSchema = require("../models/messageSchema")

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
    thread: (req, res, next) => {
        const categoly = req.params.categoly
        const thread = req.params.thread
        const Message = mongoose.model(`${categoly}-${thread}`, messageSchema)
        Message.find({})
            .then(messages => {
                res.locals.messages = messages
                res.locals.categoly = categoly
                res.locals.thread = thread
                console.log(messages)
                res.render("thread")
            })
    },

    newMessage: (req, res, next) => {
        res.locals.categoly = req.params.categoly
        res.locals.thread = req.params.thread
        res.render("newMessage")
    },


    createMessage: (req, res, next) => {
        const categoly = req.params.categoly
        const thread = req.params.thread
        const Message = mongoose.model(`${categoly}-${thread}`, messageSchema)
        const params = {
            message:  req.body.message,
            userName: req.body.user
        }
        Message.create(params)
            .then(() => {
                console.log("successfully create new thread")
                res.locals.redirect = `/${categoly}/${thread}`
                next()
            })
    },

    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if(redirectPath !== undefined) res.redirect(redirectPath)
        else next()
    }
}