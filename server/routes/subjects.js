const router = require("express").Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"tuition"
})
router.route("/amountBio").get((req,res)=>{
    const sql = 'SELECT count(subject_name) as amount FROM subjects where subject_name="BIOLOGY"';
    db.query(sql,(err, data) => {
        console.log(data);
        res.send(data);
    });
})
router.route("/amountPys").get((req,res)=>{
    const sql = 'SELECT count(subject_name) as amount FROM subjects where subject_name="PHYSIC"';
    db.query(sql,(err, data) => {
        console.log(data);
        res.send(data);
    });
})
router.route("/amountChem").get((req,res)=>{
    const sql = 'SELECT count(subject_name) as amount FROM subjects where subject_name="CHEMISTRY"';
    db.query(sql,(err, data) => {
        console.log(data);
        res.send(data);
    });
})
router.route("/amountAddM").get((req,res)=>{
    const sql = 'SELECT count(subject_name) as amount FROM subjects where subject_name="ADD-MATHEMATICS"';
    db.query(sql,(err, data) => {
        console.log(data);
        res.send(data);
    });
})
router.route("/amountMath").get((req,res)=>{
    const sql = 'SELECT count(subject_name) as amount FROM subjects where subject_name="MATHEMATICS"';
    db.query(sql,(err, data) => {
        console.log(data);
        res.send(data);
    });
})
router.route("/amountSc").get((req,res)=>{
    const sql = 'SELECT count(subject_name) as amount FROM subjects where subject_name="SCIENCE"';
    db.query(sql,(err, data) => {
        console.log(data);
        res.send(data);
    });
})
router.route("/").get((req,res)=>{
    const sql = 'SELECT * FROM subjects';
    db.query(sql,(err, data, fields) => {
        res.send(data);
    });
})
router.route('/:id').get((req,res)=>{
    const id = req.params.id;

    const sql = "select * from subjects where student_id=?";
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

router.route('/delete/:id/:subject').post((req,res)=>{
    const id = req.params.id;
    const sub = req.params.subject;
    const sql = "DELETE  FROM subjects WHERE student_id=? and subject_name=?";
    db.query(sql,[id,sub],(err,data)=>{
        if(err) throw err;
        if(data.length>0){
            console.log(data);
            res.send(data);
        }
    })
    var amountSub;
    const sql2 = "SELECT subject_name from subjects where student_id=?";
    db.query(sql2,[id],(err,data)=>{
        if(err) throw err;
        amountSub = data.length * 50  ;
        const sql3 = "UPDATE payments set price=? where student_id=?";
        db.query(sql3,[amountSub,id],(err,data)=>{
            if(err) throw err;

        })
        
    })
    
});
router.route('/update/:id/:subject').post((req,res)=>{
    const id = req.params.id;
    const sub = req.params.subject;
    const sql = "select * FROM subjects WHERE student_id=? and subject_name=?";
    const sql2 ="INSERT INTO subjects(subject_name,student_id) values(?,?) "
   
  
    db.query(sql,[id,sub],(err,data)=>{
        if(err) throw err;
        if(data.length>0){
            console.log("data have been inserted");
            res.send({"msg":"The subject already have been registered"});
        }
        else{
            db.query(sql2,[sub,id],(err,data)=>{
                if(err) throw err;
                console.log(data);
                const sql3 = "SELECT subject_name from subjects where student_id=?";
                db.query(sql3,[id],(err,data)=>{
                    if(err) throw err;
                    amountSub = data.length * 50  ;
                    const sql4 = "UPDATE payments set price=? where student_id=?";
                    db.query(sql4,[amountSub,id],(err,data)=>{
                        if(err) throw err; 
                    })
                    
                })
            })
        
        }    
    })
    
});

router.route("/subDetails/:name").get((req,res)=>{
    const name = req.params.name;

    const sql = "SELECT student_id,student_name from subjects where subject_name=?";
   
    db.query(sql,[name],(err,data)=>{
        if(err) throw err;
        res.send(data);
        
    })
})


module.exports = router;