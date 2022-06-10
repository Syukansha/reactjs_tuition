import React, {Component} from 'react';
import axios from 'axios';
import hero from './images/illustration.svg';
import logo from './images/mawarlogo.png';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';




export default class deleteUser_component extends Component {
    constructor(prop){
        super(prop);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
             username:''
             
        }
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const user = {
             username: this.state.username,
        }
        console.log(user);

        axios.post('http://localhost:5000/users/deleteUser',user)
        .then(res=> console.log(res.data));
        
        window.location = '/';
        window.alert("Data have been deleted");
        
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home"><img src={logo} width="150"
                height="50"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                </Navbar.Collapse>
                </Navbar>
                
                <section className='first'>
                    <div className='container'>
                        <div className='left-col'>
                                <h1>Pusat Tuisyen</h1>
                                <p className='subhead'>Welcome user</p>
                                
                        </div>
                        <img className='hero-img' src={hero}></img>
                    </div>
                </section>
                <div className='user'>
                <h3 className="name">Delete User</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                         <label>username:</label>
                         <input type="text" required
                         className="form-control"
                         value={this.state.username}
                         onChange={this.onChangeUsername}/>
                    
                    </div>
                   
                    
                    <div className='form-group'>
                         <input type="submit" />
                    </div>
                    </form>
                </div>

            </div>
        )
    }
}
