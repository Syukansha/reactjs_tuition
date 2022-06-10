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
        <td>{props.subjects.student_id}</td>
        <td>{props.subjects.subject_name}</td>
        <td>
             <a href="#" onClick={()=>{props.deleteSubject(props.subjects.student_id,props.subjects.subject_name)}} className="btn-del" >Drop</a>
        </td>
    </tr>
)

export default class update_subjects extends Component {
    constructor(props){
        super();

        this.deleteSubject = this.deleteSubject.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.state={
            id:'',
            subjects:[],
            uname:'',
            status:''
        }

        
    }
    componentDidMount(){
        axios.get('http://localhost:5000/subjects/'+ this.props.match.params.id)
        .then(response => {
           
           for(var i=0;i<response.data.length;i++){
               
                this.setState(prevState => ({
                    subjects: [...prevState.subjects, response.data[i]]
                  }))
           }
           console.log(this.state.subjects);
        })
        this.setState({
            id:this.props.match.params.id
        })
        this.setState({
            uname: ReactSession.get("username")
        })
    }
    deleteSubject(id,subject){
        axios.post('http://localhost:5000/subjects/delete/'+id+'/'+subject)
        .then(res => {
            console.log(res.data)
            
        });
        window.location = '/updateSubjects/'+this.props.match.params.id
    }
    addSubject(id,subject){
        
        axios.post('http://localhost:5000/subjects/update/'+id+'/'+subject)
        .then(response => {
            console.log(response.data)
            if(response.data.msg){
                this.setState({status: response.data.msg})
                alert(this.state.status)
            }
            
        });
        
        window.location = '/updateSubjects/'+this.props.match.params.id
    }
    handleLogout(e){
        localStorage.clear();
        window.location = '/'

    }
    subjectList(){
        return this.state.subjects.map(current =>{
            return <Subjects subjects={current} deleteSubject={this.deleteSubject} key={current._id}/>;
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

                <form onSubmit={this.onSubmit}>
                <section className="features">
                <h2 className="features-title">Drop Subjects</h2>
                    <h3 className="features-section">Section A: </h3>
                    
                    <table>
                        <tr>
                            <th>Student ID</th>
                            <th>Subjects</th>
                        </tr>
                        {this.subjectList()}
                    </table>
                    
                </section>
                <section className="features">
                <h2 className="features-title">Update Subjects</h2>
                    <h3 className="features-section">Section B:</h3>
                    <h5>Student's ID: {this.state.id}</h5>
                        <table>
                            <tr>
                              
                                <td>BIOLOGY</td>
                                <td>
                                    <a href="#" onClick={()=>{this.addSubject(this.state.id,"BIOLOGY")}} className="btn-update" >ADD</a>
                                </td>
                            </tr>
                            <tr>
                              
                                <td>CHEMISTRY</td>
                                <td>
                                    <a href="#" onClick={()=>{this.addSubject(this.state.id,"CHEMISTRY")}} className="btn-update" >ADD</a>
                                </td>
                            </tr>
                            <tr>
                                
                                <td>PHYSIC</td>
                                <td>
                                    <a href="#" onClick={()=>{this.addSubject(this.state.id,"PHYSIC")}} className="btn-update" >ADD</a>
                                </td>
                            </tr>
                            <tr>
                            
                                <td>ADD-MATHEMATICS</td>
                                <td>
                                    <a href="#" onClick={()=>{this.addSubject(this.state.id,"ADD-MATHEMATICS")}} className="btn-update" >ADD</a>
                                </td>
                            </tr>
                            <tr>
                              
                                <td>MATHEMATICS</td>
                                <td>
                                    <a href="#" onClick={()=>{this.addSubject(this.state.id,"MATHEMATICS")}} className="btn-update" >ADD</a>
                                </td>
                            </tr>
                            <tr>
                             
                                <td>SCIENCE</td>
                                <td>
                                    <a href="#" onClick={()=>{this.addSubject(this.state.id,"SCIENCE")}} className="btn-update" >ADD</a>
                                </td>
                            </tr>
                        </table>
                </section>

                </form>
                

            </div>
        )
    }
}
