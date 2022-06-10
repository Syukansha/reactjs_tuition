const router = require("express").Router();

const mysql = require("mysql");
const { Redirect } = require("react-router");

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"tuition"
})


router.route("/").get((req,res)=>{
    const sql = 'SELECT * FROM admin';
    db.query(sql,(err, data, fields) => {
        res.send(data);
    });
})

router.route("/add").post((req,res)=>{
    const adminID = req.body.adminID;
    const  name = req.body.adminName;
    const tel = req.body.noTel;
    const address = req.body.addr;
    const email = req.body.email;
    const pass = req.body.password;
    

    const sql = "INSERT INTO admin (ADMIN_ID,ADMIN_NAME,ADMIN_TEL,ADMIN_ADDR,ADMIN_EMAIL,ADMIN_PASS) VALUES ?";
    const values = [[adminID,name,tel,address,email,pass]];

    db.query(sql,[values],(res,err)=>{
        if(err) throw err
        else{
            console.log("Have been inserted.");
            res.send({"msg":"You have registered"});
        }
    })
})

router.route("/delete").post((req,res)=>{
    const adminID = req.body.adminID;
    const sql = "DELETE FROM admin WHERE  ADMIN_ID= ?";
    const values = [[adminID]];
    db.query(sql,[values],(res)=>{
        console.log("Data have been deleted.");
        
    })
})
router.route("/login").get((req,res)=>{
    console.log(req.session.user);
    res.send({user:req.session.user});
})
router.route("/login").post((req,res,data)=>{
    const  name = req.body.username;
    const pass = req.body.password;

    const sql = "SELECT * FROM admin where ADMIN_NAME=? and ADMIN_PASS=?";
    const values = [[name,pass]];
  
    db.query(sql,[name,pass],(err,data)=>{     
        console.log("hwllo");   
        
        if(data.length>0){
            console.log(data);  
            req.session.user = data[0].ADMIN_NAME;
            console.log(req.session.user);
            res.send(data);
        }
        else{
            res.send({"msg":"wrong username or password"});
        }
        
    }) 
})


router.route("/update").post((req,res)=>{
    
    const adminID = req.body.adminID;
    const  name = req.body.adminName;
    const tel = req.body.noTel;
    const address = req.body.addr;
    const email = req.body.email;
    const pass = req.body.password;

    const sql = "UPDATE admin SET ADMIN_NAME=?,ADMIN_TEL=?,ADMIN_ADDR=?,ADMIN_EMAIL=?,ADMIN_PASS =? WHERE ADMIN_ID= ? ";
   
    
    db.query(sql,[name,tel,address,email,pass,adminID],(err,result) => {
        if(err) throw err;
        console.log(result);
        console.log("data have been updated!");
    });
})

router.route('/:id').get((req,res)=>{
    const id = req.params.id;

    const sql = "select * from admin where ADMIN_ID=?";
    db.query(sql,[id],(err,data)=>{
        if(err) throw err;
        if(data.length>0){
            console.log(data);
            res.json(data);
        }
        else{
            console.log('failed to select');
        }
    })
    
    
});

module.exports = router;