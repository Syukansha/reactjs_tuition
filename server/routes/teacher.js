const router = require("express").Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"tuition"
})
router.route("/").get((req,res)=>{
    const sql = 'SELECT * FROM teachers';
    db.query(sql,(err, data, fields) => {
        res.send(data);
    });
})
router.route("/amountTeacher").get((req,res)=>{
    const sql = 'SELECT count(teacher_id) as amount FROM teachers';
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
    const subject = req.body.subject;

    const sql5= "select * from teachers where teacher_id=?";
    const sql = "INSERT INTO teachers(teacher_id, teacher_name, teacher_email, teacher_tel, teacher_addr, subject_name) VALUES ?";
    const values = [[id,name,email,phone,addr,subject]];
    
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

    const sql = "delete from teachers where teacher_id=?";
    db.query(sql,[id],(err,data)=>{
        if(err) throw err;
        console.log("data have been deleted");
    }) 
})

router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    console.log(id);
    const sql = "select * from teachers where teacher_id=?";
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
    const subject = req.body.subject
    

    const sql = "UPDATE teachers SET teacher_name=?,teacher_email=?,teacher_tel=?,teacher_addr=?,subject_name=? WHERE teacher_id= ? ";
    //const sql = "update student inner join payments on student.student_id=payments.student_id set student_name=?,student_no=?,student_school=?,student_email=?,price=? where student.student_id=? and payment.student_id=?"
    db.query(sql,[name,email,tel,addr,subject,id],(err,result) => {
        if(err) throw err;
        console.log(result);
        console.log("data have been updated!");
    });
    

})

module.exports = router;