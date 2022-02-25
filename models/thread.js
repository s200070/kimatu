"use strict";

const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const threadSchema = new Schema(
    {
        title: {
            type:String,
            unique: true
        },
        categoly: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Thread", threadSchema)