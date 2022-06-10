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
export default class teacher_insert extends Component {
    constructor(props){
        super(props);

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:'',
            name:'',
            email:'',
            phone:'',
            addr:'',
            subject:'',
            uname:''
        }
    }
    componentDidMount(){
        this.setState({
            uname: ReactSession.get("username")
        })
    }
    onChangeId(e){
        this.setState({
            id: e.target.value
        })
    }
    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    onChangePhone(e){
        this.setState({
            phone: e.target.value
        })
    }
    onChangeAddress(e){
        this.setState({
            addr: e.target.value
        })
    }
    onChangeSubject(e){
        this.setState({
            subject: e.target.value
        })
    }
    handleLogout(e){
        localStorage.clear();
        window.location = '/'

    }
    onSubmit(e){
        e.preventDefault();
        const teacher = {
            id: this.state.id,
            name: this.state.name,
            addr: this.state.addr,
            phone: this.state.phone,
            email:this.state.email,
            subject: this.state.subject

        }
        console.log(teacher);
        axios.post('http://localhost:5000/teacher/add',teacher)
        .then(res => {
            console.log(res.data)
            window.location = "/insertTeacher"
            alert("SUCCESS: Data have been inserted")
        });
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
                    <h2 className="features-title">Teacher Registration</h2>
                        <h3 className="features-section">Section A: Personal's Detail</h3>
                        
                            <div className='form-group'>
                                <label>IC:</label>
                                <input type="text" required
                                className="form-control"
                                value={this.state.id}
                                onChange={this.onChangeId}/>
                            </div>
                            <div className='form-group'>
                                <label>Name:</label>
                                <input type="text" required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}/>
                            </div>
                            <div className='form-group'>
                                <label>Address:</label>
                                <input type="text" required
                                className="form-control"
                                value={this.state.addr}
                                onChange={this.onChangeAddress}/>
                            </div>
                            <div className='form-group'>
                                <label>Phone:</label>
                                <input type="text" required
                                className="form-control"
                                value={this.state.phone}
                                onChange={this.onChangePhone}/>
                            </div>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input type="text" required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}/>
                            </div>
                            <div className='form-group'>
                                <label>Subject:</label>
                                <input type="text" required
                                className="form-control"
                                value={this.state.subject}
                                onChange={this.onChangeSubject}/>
                            </div>
                            <div>
                                <input type="submit" value="Submit" className="info"/>
                            </div>
                    
                </section>
                
                </form>
                </div>
            </div>
        )
    }
}
