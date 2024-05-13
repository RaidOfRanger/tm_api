const mongoose = require('mongoose')
const login = require('../Model/login.model')

const checkStatus = (role) => async (req,res,next)=> {
    let {Username } = req.body

    if(role != "admin" ){
        res.status('401').send({
            message:"not previllaged"
        })
    }

    // const record = await login.findOne({Email: Username})

    console.log("sss",record)
    console.log("my body ",req.body)
    console.log("my body ",role)
    next();

}
module.exports = checkStatus


// need to set up an unique id for each teacher