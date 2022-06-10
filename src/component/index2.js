import React, {Component} from 'react';
import axios from 'axios';
import logo from './images/misi.jpg';
import student from './images/graduated.png';
import staff from './images/employees.png';
import subjects from './images/mortarboard.png'
import teachers from './images/coaching.png'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import {ReactSession} from 'react-client-session';

export default class index2 extends Component {

    constructor(props){
        super();
        
        this.state = {
            amountStu:'',
            amountStaff:'',
            amountTeacher:'',
            uname:''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/student/amountStudent')
        .then((response)=>{
            this.setState({amountStu:response.data[0].amount})
        })

        axios.get('http://localhost:5000/staff/amountStaff')
        .then((response)=>{
            this.setState({amountStaff:response.data[0].amount})
        })
        axios.get('http://localhost:5000/teacher/amountTeacher')
        .then((response)=>{
            this.setState({amountTeacher:response.data[0].amount})
        })
        
        
        this.setState({
            uname: ReactSession.get("username")
        })
        console.log(ReactSession.get("username"))
      
    }
    handleLogout(e){
        localStorage.clear();
        window.location = '/'

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
               <section className="dashboard">
                   
                   
                   <h2 className="dashboard-title">Dashboard</h2> 
                   
                   <a href="/studentInsert" className="insert-section"><div className='dashboard-student'>
                       <h3>{this.state.amountStu}</h3>
                       <p >Student</p>
                       <a href="/studentList" className="info" >More info</a>
                   </div></a>

                   <a href="/insertStaff" className="insert-section"><div className='dashboard-staff'>
                        <h3>{this.state.amountStaff}</h3>
                       <p>Staff</p>
                       <a href="/staffList" className="info">More info</a>
                      
                   </div></a>
                   <div className='dashboard-subjects'>
                         <h3>6</h3>
                       <p>Subjects</p>
                       <a href="/subjectList" className="info">More info</a>
                   </div>
                   <a href="/insertTeacher" className="insert-section" ><div className='dashboard-teachers'>
                         <h3>{this.state.amountTeacher}</h3>
                       <p>Teachers</p>
                       <a href="teacherList" className="info">More info</a>
                   </div></a>
                   
               </section>
               
            </div>
        )
    }
}
