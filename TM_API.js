const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
var cookieParser = require('cookie-parser')
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
}

const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:4200');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true); next();
});

const router = require('./Router/tm.route')

app.options('*', cors())
//k5h77ULB3r33b5kl

mongoose
    .connect('mongodb+srv://cluster1.6q8z7l2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
        {
            dbName: 'teacher',
            user: 'Itachi',
            pass: 'oQ5K1RGzOU4oAYlc',
            useNewUrlParser: true,
            useUnifiedTopology: true

        }
    ).then(() => {
        console.log("connected to database")
    }
    )



app.use('/teacher', router)


app.listen(3000, () => {
    console.log('listening to the port 3000 .....')
});