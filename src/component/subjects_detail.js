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
const Subjects = props => (
    <tr>
        <td>{props.id.student_id}</td>
        <td>{props.id.student_name}</td>
    </tr>
)

export default class subjects_detail extends Component {
    constructor(props){
        super(props);

        this.state = {
            id:[],
            subject_name:'',
            uname:''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/subjects/subDetails/'+this.props.match.params.name)
        .then(response =>{
            for(var i=0;i<response.data.length;i++){
               
                this.setState(prevState => ({
                    id: [...prevState.id, response.data[i]]
                  }))
           }   
          
           this.setState({
               subject_name:this.props.match.params.name
           })
        })
        this.setState({
            uname: ReactSession.get("username")
        })
    }
    subjectList(){
        return this.state.id.map(current =>{
            return <Subjects id={current}  key={current._id}/>;
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
                <section className="features">
                <h2 className="features-title">{this.state.subject_name}'s detail</h2><br/>
                <table>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                           
                        </tr>
                        {this.subjectList()}
                    </table>
                </section>
            </div>
        )
    }
}
