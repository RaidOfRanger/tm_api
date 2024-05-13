const mongoose = require('mongoose')
const Schema = mongoose.Schema

const login_schema = new Schema({
    Username: {
        type: String,
        require: true
    },
    Email: {
        type:String,
        require:true
    },
    Pass: {
        type: String,
        require: true
    },
    Role: {
        type: String,
        require: true
    }
   
})

const login = mongoose.model('login', login_schema)
module.exports = login

