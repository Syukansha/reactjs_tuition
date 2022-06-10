import React, {Component} from 'react';
import axios from 'axios';
import menu from './images/menu.svg';
import exit from './images/exit.svg';
import hero from './images/illustration.svg';
import logo from './images/mawarlogo.png';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';



export default class index extends Component{

     constructor(prop){
          super(prop);
          this.onChangeUsername = this.onChangeUsername.bind(this);
          this.onChangePassword = this.onChangePassword.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
          this.state={
               username:'',
               password:'',
               users:[]
          }
     }

     componentDidMount(){
          axios.get('http://localhost:5000/users')
          .then(res =>{
              if(res.data.length > 0){
                  this.setState({
                      users: res.data.map(user => user.userid),
                      username: res.data[0].userid
                  });
              }
          })
      }

     onChangeUsername(e){
          this.setState({
               username: e.target.value
          });
     }
     onChangePassword(e){
          this.setState({
               password: e.target.value
          })
     }

     onSubmit(e){
          e.preventDefault();

          const user = {
               username: this.state.username,
               password: this.state.password

          }
          console.log(user);

          axios.post('http://localhost:5000/users/add',user)
          .then(res=> console.log(res.data));
          
          window.location = '/';
          window.alert("Data have been inserted");
          
     }
     
    render(){
        return(
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
                               <div className='hero-cta'>
                                   <a className='addUser'>Add user</a>
                               </div>
                          </div>
                         <img className='hero-img' src={hero}></img>
                     </div>
                </section>

               <div className='user'>
                    <h3 className="name">Create new User</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                         <label>username:</label>
                         <input type="text" required
                         className="form-control"
                         value={this.state.username}
                         onChange={this.onChangeUsername}/> 
                    
                    </div>
                    <div className='form-group'>
                         <label>Password:</label>
                         <input type="text" required
                         className="form-control"
                         value={this.state.password}
                         onChange={this.onChangePassword}/>
                         
                    
                    </div>
                    <div>
                         <label>Search User:</label>
                         
                         <select ref='userInput' required
                              className='form-control'
                              value={this.state.username}
                              onChange={this.onChangeUsername}>
                              {
                              this.state.users.map(function(users){
                                   return(
                                   <option
                                        key={users}
                                        value={users}>{users}
                                   </option>)
                              })
                              }
                         </select>
                         
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