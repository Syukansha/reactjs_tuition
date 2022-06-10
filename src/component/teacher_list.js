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
const Teacher = props => (
    <tr>
        <td>{props.teacher.teacher_id}</td>
        <td>{props.teacher.teacher_name}</td>
        <td>{props.teacher.teacher_email}</td>
        <td>{props.teacher.teacher_tel}</td>
        <td>{props.teacher.teacher_addr}</td>
        <td>{props.teacher.subject_name}</td>
      
        <td>
            <Link className="btn-update" to={"/teacherEdit/"+ props.teacher.teacher_id}>Update</Link><a href="#" onClick={()=>{props.deleteTeacher(props.teacher.teacher_id)}} className="btn-del" >Delete</a>
        </td>
    </tr>
)

export default class teacher_list extends Component {
    constructor(props){
        super(props);

        this.deleteTeacher = this.deleteTeacher.bind(this);

        this.state = {
            teacher:[],
            uname:''
        }

    }
    componentDidMount(){
        axios.get('http://localhost:5000/teacher')
        .then(response => {
        console.log(response.data)
        this.setState({teacher: response.data})
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({
            uname: ReactSession.get("username")
        })
    }
    deleteTeacher(id){
        axios.post('http://localhost:5000/teacher/delete/'+id)
        .then(res => {
            console.log(res.data);
            
        });
        window.location = "/teacherList";
    }
    handleLogout(e){
        localStorage.clear();
        window.location = '/'

    }
    teacherList(){
        return this.state.teacher.map(current =>{
            return <Teacher teacher={current} deleteTeacher={this.deleteTeacher} key={current._id}/>;
        })
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
                <section className="table_list " >
                    <h2 className="list-title">Teacher List</h2>
                    <table border="1">
                        <thead>
                        <tr className="thead">
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>   
                            <th>PHONE</th>                                                    
                            <th>ADDRESS</th>
                            <th>Subject</th>
                            <th>EDIT</th>                            
                        </tr>
                        </thead>
                        <tbody>                                
                            {this.teacherList()}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}
