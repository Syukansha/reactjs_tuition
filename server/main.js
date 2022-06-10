const express = require("express");

const mysql = require("mysql");
const cors = require('cors');
const port =process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

app.use(session({
    key:"user",
    secret: "tuition",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24,
    },
}))

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"tuition"
})
db.connect((err)=>{
    if(err) throw err;
    console.log("Connected!");
})

const userRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const subjectRouter = require("./routes/subjects");
const staffRouter = require("./routes/staff");
const teacherRouter = require("./routes/teacher");
app.use('/student',studentRouter);
app.use('/admin',userRouter);
app.use('/subjects',subjectRouter);
app.use('/staff',staffRouter);
app.use('/teacher',teacherRouter);



app.listen(port,(err)=>{
    if(err) throw err;
    console.log('listening to '+ port)});