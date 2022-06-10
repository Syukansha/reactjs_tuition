const router = require("express").Router();
const mysql = require("mysql");
const session = require("react-client-session");
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"tuition"
})
router.route("/").get((req,res)=>{
    const sql = 'SELECT * FROM staff';
    db.query(sql,(err, data, fields) => {
        res.send(data);
    });
})
router.route("/amountStaff").get((req,res)=>{
    const sql = 'SELECT count(STAFF_ID) as amount FROM staff';
    db.query(sql,(err, data) => {
        res.send(data);
    });
})
router.route("/add").post((req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const addr = req.body.addr;
    const pass = req.body.pass;

    const sql5= "select * from staff where STAFF_ID=?";
    const sql = "INSERT INTO staff(STAFF_ID,STAFF_NAME ,STAFF_EMAIL,STAFF_TEL,STAFF_ADDR,STAFF_PASS) VALUES ?";
    const values = [[id,name,email,phone,addr,pass]];
    
    db.query(sql5,[[id]],(err,data)=>{
        if(data.length>0){
            console.log("Data already existed");
        }
        else{
            db.query(sql,[values],(err,data)=>{
                console.log("Have been inserted.");
                res.send(data);
            })
        }
    })
})

router.route("/delete/:id").post((req,res)=>{
    const id = req.params.id;

    const sql = "delete from staff where STAFF_ID=?";
    db.query(sql,[id],(err,data)=>{
        if(err) throw err;
        console.log("data have been deleted");
    }) 
})
router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    console.log(id);
    const sql = "select * from staff  where STAFF_ID=?";
    db.query(sql,[id],(err,data)=>{
        if(err) throw err;
        if(data.length>0){
            console.log(data);
            res.send(data);
        }
        else{
            console.log('failed to select');
        }
    })
      
});

router.route("/update/:id").post((req,res)=>{
    
    const id = req.body.id;
    const  name = req.body.name;
    const tel = req.body.phone;
    const addr = req.body.addr;
    const email = req.body.email;
    const pass = req.body.pass
    

    const sql = "UPDATE staff SET STAFF_NAME=?,STAFF_EMAIL=?,STAFF_ADDR=?,STAFF_TEL=?,STAFF_PASS=? WHERE STAFF_ID= ? ";
    //const sql = "update student inner join payments on student.student_id=payments.student_id set student_name=?,student_no=?,student_school=?,student_email=?,price=? where student.student_id=? and payment.student_id=?"
    db.query(sql,[name,email,addr,tel,pass,id],(err,result) => {
        if(err) throw err;
        console.log(result);
        console.log("data have been updated!");
    });

})
router.route("/login").post((req,res,data)=>{
    const  name = req.body.username;
    const pass = req.body.password;

    const sql = "SELECT * FROM staff where STAFF_NAME=? and STAFF_PASS=?";
    const values = [[name,pass]];
  
    db.query(sql,[name,pass],(err,data)=>{     
        console.log("hello");   
       
        if(data.length>0){
            console.log(data);  
            res.send(data);
        }
        else{
            res.send({"msg":"wrong username or password"});
        }
        
    }) 
})
module.exports = router;