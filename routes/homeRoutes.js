"use strict";

const router = require("express").Router()
const homeController = require("../controllers/homeController")

router.get("/:categoly/new", homeController.newTheread)
router.post("/:categoly/create", homeController.createThread, homeController.redirectView)
router.get("/:categoly/:thread/new", homeController.newMessage)
router.post("/:categoly/:thread/create", homeController.createMessage, homeController.redirectView)
router.get("/:categoly/:thread", homeController.thread)
router.get("/:categoly", homeController.categoly)
router.get("/", homeController.index)

module.exports = router