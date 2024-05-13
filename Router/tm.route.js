const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const bcyprt = require('bcrypt')

const teacher = require('../Model/teacher.model')
const login = require('../Model/login.model')
const checkStatus = require('../Middleware/rolebase')

const secretkey = "checkup"


router.post('/add',checkStatus(),(req, res, next) => {
    console.log("requested body", req.body)
    const addteacher = new teacher(req.body)
    addteacher.save()
        .then(result => {
            res.send(result)
            console.log("saved")
        })
        .catch(err => {
            console.log(err)
        })
})


//from here jwttoken will get generated and it will be send to frontend
router.post('/login', async (req, res, next) => {
    console.log(req.body)
    const logindata = new login(req.body)

    const test = await login.findOne({ Email: req.body.username })
    console.log("test", test)


    if (!test) {
        return res.status(404).send({
            message: "user not avail"
        })
    }
    if (!await bcyprt.compare(req.body.pass, test.Pass)) {
        return res.status(404).send({
            message: "password is incorrect"
        })
    }

    const token = jwt.sign({ logindata }, secretkey)
    // console.log(test)
    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
    res.json({
        token,
    })
})

//first when user register this api will hit
router.post('/register', async (req, res, next) => {
    const logindata = new login(req.body)
    console.log(logindata)
    //generating crypted paasword
    const salt = await bcyprt.genSalt(10)
    const hashpass = await bcyprt.hash(logindata.Pass, salt)
    logindata.Pass = hashpass
    //checking in db if email id is already registered
    const record = await login.findOne({ Email: logindata.Email })
    // if already exist
    if (record) {
        return res.status(401).send({
            message: "Email is already exist"
        })
    } else {//else send data
        const token = jwt.sign({ logindata }, secretkey)
        //sending data to db and in response sending jwt token back to frontend to save it to local storage of chrome
        logindata.save()
            .then((result) => {
                // sending cookie back to browser
                res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
                console.log("saved")
                res.send({
                    message: "success"
                })

            })
            .catch(err => {
                console.log("error", err)

            })
    }
})

router.get('/fetchall', (req, res, next) => {

    // const token = req.cookies.jwt
    // const check_jwt = jwt.verify(token,secretkey)
    // console.log(check_jwt)

    // if(!check_jwt){
    //     res.status(401).send({
    //         message:"session over"
    //     })
    // }

    teacher.find({}).then((result) => {

        res.send(result);
    })



})



module.exports = router