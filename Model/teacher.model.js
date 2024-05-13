const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacher_schema = new Schema({
    Fname: {
        type: String,
        require: true
    },
    Lname: {
        type: String,
        require: true
    },
    DOB: {
        type: String ,
        require: true
    },
    Gender: {
        type: String,
        require: true
    },
    EXP: {
        type: Number,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})

const teacher = mongoose.model('teacher', teacher_schema)
module.exports = teacher

