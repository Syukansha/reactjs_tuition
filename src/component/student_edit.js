import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import logo from './images/misi.jpg';
import student from './images/graduated.png';
import staff from './images/employees.png';
import subjects from './images/mortarboard.png'
import teachers from './images/coaching.png'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import study from "./images/study.jpg";
import {ReactSession} from 'react-client-session';
export default class student_edit extends Component {
    constructor(props){
        super(props);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onChangePayment = this.onChangePayment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            username:'',
            id:'',
            school:'',
            email:'',
            phone:'',
            addr:'',
            payment:'',
            status:'',
            uname:''
           
        }
        
    }
    componentDidMount(){
        axios.get('http://localhost:5000/student/'+ this.props.match.params.id)
        .then((response) =>{
            this.setState({
                id: response.data[0].student_id,
                username: response.data[0].student_name,
                email: response.data[0].student_email,
                phone: response.data[0].student_no,
                school: response.data[0].student_school,
                payment: response.data[0].price,
                status: response.data[0].status

            })
        })
        .catch(function(err){
            console.log(err);
        })
        this.setState({
            uname: ReactSession.get("username")
        })
    }
   
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePhone(e){
        this.setState({
            phone: e.target.value
        });
    }
    onChangeSchool(e){
        this.setState({
            school: e.target.value
        });
    }
    onChangePayment(e){
        this.setState({
            payment: e.target.value
        })
    }
    onChangeStatus(e){
        this.setState({
            status: e.target.value
        })
    }
    handleLogout(e){
        localStorage.clear();
        window.location = '/'

    }
  
    onSubmit(e){
        e.preventDefault();
        const student = {
            id: this.state.id,
            username: this.state.username,
            school: this.state.school,
            phone: this.state.phone,
            email:this.state.email,
            payment: this.state.payment,
            status: this.state.status

        }
        console.log(student);
        axios.post('http://localhost:5000/student/update/'+this.props.match.params.student_id,student)
        .then(res => {
            console.log(res.data)
            
        });
        window.location = "/studentList"
        alert("SUCCESS: Data have been updated")
    }
    render() {
        return (
            <div>
                 <Navbar className="color-nav" variant="dark" expand="lg" sticky="top">
               <Navbar.Brand href="/dashboard"><label className="misi-logo">Misi</label><label className="jaya-logo">Jaya</label></Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                   
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/studentInsert">Student Registration</NavDropdown.Item>
                    <NavDropdown.Item href="/insertStaff">Staff Registration</NavDropdown.Item>
                    <NavDropdown.Item href="/insertTeacher">Teacher Registration</NavDropdown.Item> 
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/staffList">List of Staff</NavDropdown.Item>
                    <NavDropdown.Item href="/studentList">List of Student</NavDropdown.Item>
                    <NavDropdown.Item href="/teacherList">List of Teacher</NavDropdown.Item>
                    <NavDropdown.Item href="/subjectList">List of Subject</NavDropdown.Item>
                    </NavDropdown>
               </Nav>
               <h4 className="user-session">Welcome {this.state.uname}</h4> 
               <button className="btn-logout" onClick={this.handleLogout}>Log Out</button>
               </Navbar.Collapse>
               </Navbar>
               <section className="sidebar">
                    <ul>
                        <li ><a href="/studentList"><img src={student}  className='student-menu'></img><p className="stu">Students</p></a></li>
                        <li ><a href="/staffList"><img src={staff}  className='staff-menu'></img><p className="stu">Staff</p></a></li>
                        <li ><a href="/subjectList"><img src={subjects}  className='subjects-menu'></img><p className="stu">Subjects</p></a></li>
                        <li ><a href="/teacherList"><img src={teachers}  className='teachers-menu'></img><p className="stu">Teachers</p></a></li>
                    </ul>
                </section>
                <div>
                <form onSubmit={this.onSubmit}>
                <section className="features">
                <h2 className="features-title">Student Update</h2>
                    <h3 className="features-section">Section A: Personal's Detail</h3>
                    
                        <div className='form-group'>
                            <label>IC:</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.id}
                            disabled
                          />
                        </div>
                        <div className='form-group'>
                            <label>Name:</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className='form-group'>
                            <label>School:</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.school}
                            onChange={this.onChangeSchool}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone:</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Payment(RM):</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.payment}
                            onChange={this.onChangePayment}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Payment's Status:</label>
                            <input type="text" required
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChangeStatus}
                            />
                        </div>
                        
                        <div className='form-group'>
                            <input type="submit" value="Update" className="info"/>                                    
                        </div>
                </section>
               
                </form>
                </div>
            </div>
        )
    }
}
