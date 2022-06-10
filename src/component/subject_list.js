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

export default class subject_list extends Component {
    constructor(props){
        super(props);
        this.state ={
            biology:'',
            physic:'',
            chemistry:'',
            addMath:'',
            math:'',
            science:'',
            uname:''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/subjects/amountBio')
        .then(response=>{
           console.log(response.data[0].amount)
           this.setState({
               biology: response.data[0].amount
           })
        })
        axios.get('http://localhost:5000/subjects/amountPys')
        .then(response=>{
           console.log(response.data[0].amount)
           this.setState({
               physic: response.data[0].amount
           })
        })
        axios.get('http://localhost:5000/subjects/amountChem')
        .then(response=>{
           console.log(response.data[0].amount)
           this.setState({
               chemistry: response.data[0].amount
           })
        })
        axios.get('http://localhost:5000/subjects/amountAddM')
        .then(response=>{
           console.log(response.data[0].amount)
           this.setState({
               addMath: response.data[0].amount
           })
        })
        axios.get('http://localhost:5000/subjects/amountMath')
        .then(response=>{
           console.log(response.data[0].amount)
           this.setState({
               math: response.data[0].amount
           })
        })
        axios.get('http://localhost:5000/subjects/amountSc')
        .then(response=>{
           console.log(response.data[0].amount)
           this.setState({
               science: response.data[0].amount
           })
        })
        this.setState({
            uname: ReactSession.get("username")
        })
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
                <section className="subjectList">
                    <Link to={"/subjects_detail/"+"biology"}><div>
                        <h2 className="subject-amount">{this.state.biology}</h2>
                        <h5>BIOLOGY</h5>
                    </div></Link>
                    <Link to={"/subjects_detail/"+"physic"}><div>
                        <h2 className="subject-amount">{this.state.physic}</h2>
                        <h5>PHYSIC</h5>
                    </div></Link>
                    
                    <Link to={"/subjects_detail/"+"chemistry"}><div>
                        <h2 className="subject-amount">{this.state.chemistry}</h2>
                        <h5>CHEMISTRY</h5>
                    </div></Link>
                    <Link to={"/subjects_detail/"+"add-mathematics"}><div>
                        <h2 className="subject-amount">{this.state.addMath}</h2>
                        <h5>ADD-MATHEMATICS</h5>
                    </div></Link>
                    <Link to={"/subjects_detail/"+"mathematics"}><div>
                        <h2 className="subject-amount">{this.state.math}</h2>
                        <h5>MATHEMATICS</h5>
                    </div></Link>
                    <Link to={"/subjects_detail/"+"science"}><div>
                        <h2 className="subject-amount">{this.state.science}</h2>
                        <h5>SCIENCE</h5>
                    </div></Link>
                </section>
            </div>
        )
    }
}
