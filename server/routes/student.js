const router = require("express").Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"tuition"
})
router.route("/").get((req,res)=>{
    const sql = 'SELECT * FROM student';
    db.query(sql,(err, data, fields) => {
        res.send(data);
    });
})

router.route("/amountStudent").get((req,res)=>{
    const sql = 'SELECT count(student_id) as amount FROM student';
    db.query(sql,(err, data) => {
        res.send(data);
    });
})


router.route("/add").post((req,res)=>{
    const name = req.body.username;
    const id = req.body.id;
    const school = req.body.school;
    const phone = req.body.phone;
    const email = req.body.email;
    const subject = req.body.subjects;
    const subjects = subject.toString();
 

    const sql5= "select * from student where student_id=?";
    const sql = "INSERT INTO student(student_id,student_name,student_school,student_no,student_email) VALUES ?";
    const values = [[id,name,school,phone,email]]
    
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

    const sql2 = "INSERT INTO subjects(subject_name,student_id,student_name) values ?";
    const sql3 ="select * from subjects where subject_name =? and student_id=?";  

   for(var i =0;i<subject.length;i++){
        
        const values2 = [[subject[i].toString(),id,name]];
        db.query(sql3,[subject[i].toString(),id],(err,data)=>{
            if(data.length>0){
                console.log("data already exist");
            }
            else{
                db.query(sql2,[values2],(err,result)=>{
                    console.log("data have been inserted");
                })
            }
        })
    }
    
   console.log(subjects);
   console.log(subject[2]);

    const payment = 50*(subject.length);
    console.log(payment);
    const sql4 = "INSERT INTO payments(price,student_name,student_id,status) values ?";
    const sql6= "select * from payments where student_id=?";
    const stat = "pending"
    const values3 = [[payment,name,id,stat]]
    db.query(sql6,[[id]],(err,data)=>{
        if(data.length>0){
            console.log("data already exist");
        }
        else{
            db.query(sql4,[values3],(err,data)=>{
                console.log("payment have been inserted");
            })
        }
    })
})

router.route("/update/:id").post((req,res)=>{
    
    const id = req.body.id;
    const  name = req.body.username;
    const tel = req.body.phone;
    const school = req.body.school;
    const email = req.body.email;
    const price = req.body.payment
    const status = req.body.status;

    const sql = "UPDATE student SET student_name=?,student_no=?,student_school=?,student_email=? WHERE student.student_id= ? ";
    //const sql = "update student inner join payments on student.student_id=payments.student_id set student_name=?,student_no=?,student_school=?,student_email=?,price=? where student.student_id=? and payment.student_id=?"
    db.query(sql,[name,tel,school,email,id],(err,result) => {
        if(err) throw err;
        console.log(result);
        console.log("data have been updated!");
    });
    const sql2 = "update payments set price=?,student_name=?,status=? where student_id=?";
    db.query(sql2,[price,name,status,id],(err) => {
        if(err) throw err;
        console.log("price have been updated!");
    });

})
router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    console.log(id);
    const sql = "select * from student join payments on student.student_id=payments.student_id where student.student_id=?";
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
router.route("/delete/:id").post((req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM student WHERE student_id=?";
    console.log(id);
    db.query(sql,[id],(res)=>{
        console.log("Data have been deleted.");
        
    })


    const sql2 = "DELETE FROM payments WHERE student_id=?";
    db.query(sql2,[id],(res)=>{
        console.log("Data have been deleted.");
        
    })

    const sql3 = "DELETE FROM subjects WHERE student_id=?";
    db.query(sql3,[id],(res)=>{
        console.log("Data have been deleted.");
        
    })
})
module.exports = router;