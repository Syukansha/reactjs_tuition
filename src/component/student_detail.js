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
        
        {props.subjects.subject_name}
    </tr>
)

export default class student_detail extends Component {
    constructor(props){
        super(props);

        this.state ={
            name:'',
            id:'',
            school:'',
            phone:'',
            email:'',
            payment:'',
            subjects:[],
            status:'',
            uname:''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/student/'+ this.props.match.params.id)
        .then(response=>{
            this.setState({
                id: response.data[0].student_id,
                name: response.data[0].student_name,
                email: response.data[0].student_email,
                phone: response.data[0].student_no,
                school: response.data[0].student_school, 
                payment: response.data[0].price,
                status: response.data[0].status
            })
            this.setState({
                uname: ReactSession.get("username")
            })
        })
        axios.get('http://localhost:5000/subjects/'+ this.props.match.params.id)
        .then(response => {
           
           for(var i=0;i<response.data.length;i++){
               
                this.setState(prevState => ({
                    subjects: [...prevState.subjects, response.data[i]]
                  }))
           }
           console.log(this.state.subjects);
        })
    }
    handleLogout(e){
        localStorage.clear();
        window.location = '/'

    }
    subjectList(){
        return this.state.subjects.map(current =>{
            return <Subjects subjects={current}  key={current._id}/>;
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
                <section className="features">
                <h2 className="features-title">Student's detail</h2><br/>
                   
                    
                        <div className='form-group'>
                            <label><strong>IC</strong> : {this.state.id}</label>
                            
                        </div>
                        <div className='form-group'>
                            <label><strong>NAME</strong> : {this.state.name}</label>
                            
                        </div>
                        <div className='form-group'>
                            <label><strong>SCHOOL</strong> : {this.state.school}</label>
                          
                        </div>
                        <div className='form-group'>
                            <label><strong>PHONE</strong> : {this.state.phone}</label>
                            
                        </div>
                        <div className='form-group'>
                            <label><strong>EMAIL</strong> : {this.state.email}</label>
                           
                        </div>
                        <div className='form-group'>
                            <label><strong>PAYMENT</strong> : RM{this.state.payment}</label>
                           
                        </div>
                        <div className='form-group'>
                            <label><strong>PAYMENT'S STATUS</strong> : {this.state.status}</label>
                           
                        </div>
                        <br/>
                        <table>
                        <tr>
                         
                            <th>Subjects</th>
                        </tr>
                        {this.subjectList()}
                    </table>
                    
                </section>
            </div>
        )
    }
}
