const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const APIRouter = require("./routers/api");

const app = express();

app.use((req,res,next) => {
    next();
})

app.use(cors({origin:['http://localhost:3000'], credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/igdb", { useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
    if (err) console.log(err);
    else console.log(6900, (err)=> {
        if (err) console.log(err);
        else console.log("Server start successfully.");
    })
})

app.use("/api", APIRouter);

app.listen(6900, (err) => {
    if (err) console.log(err);
    else console.log("Server start successfully.");
})