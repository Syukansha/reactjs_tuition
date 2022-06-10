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

const Staff = props => (
    <tr>
        <td>{props.staff.STAFF_ID}</td>
        <td>{props.staff.STAFF_NAME}</td>
        <td>{props.staff.STAFF_EMAIL}</td>
        <td>{props.staff.STAFF_TEL}</td>
        <td>{props.staff.STAFF_ADDR}</td>
        <td>
            <Link className="btn-update" to={"/staffEdit/"+ props.staff.STAFF_ID}>Update</Link>  
            <a href="#" onClick={()=>{props.deleteStaff(props.staff.STAFF_ID)}} className="btn-del" >Delete</a>
        </td>
    </tr>
)


export default class staff_list extends Component {
    constructor(props){
        super(props);

        this.deleteStaff = this.deleteStaff.bind(this);

        this.state ={
            staff:[],
            uname:''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/staff')
        .then(response => {
        console.log(response.data)
        this.setState({staff: response.data})
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({
            uname: ReactSession.get("username")
        })
    }
    staffList(){
        return this.state.staff.map(current =>{
            return <Staff staff={current} deleteStaff={this.deleteStaff} key={current._id}/>;
        })
    }
    deleteStaff(id){
        axios.post('http://localhost:5000/staff/delete/'+id)
        .then(res => console.log(res.data));
        
        window.location = "/staffList";
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
                <section className="table_list">
                    <h2 className="list-title">Staff List</h2>
                    <table border="1">
                        <thead>
                        <tr className="thead">
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>                           
                            <th>ADDRESS</th>
                            <th>EDIT</th>                            
                        </tr>
                        </thead>
                        <tbody>                                
                            {this.staffList()}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}
