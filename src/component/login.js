import React,{ Component } from 'react'
import axios from 'axios';
import logo from './images/misi.jpg';
import {ReactSession} from 'react-client-session';


export default class login extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUsername =this.onChangeUsername.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            email:'',
            password:'',
            setLoginStatus:'',
            
        }
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
     }
     onChangePassword(e){
         this.setState({
             password: e.target.value
         });
      }
      
 
     onSubmit(e){
         e.preventDefault();
         
         const user = {
             username: this.state.username,
             password: this.state.password,
         }
 
         console.log(user);
 
         axios.post('http://localhost:5000/staff/login',user)
         .then((response)=>{
             console.log(response);
             if(response.data.msg){
                
                this.setState({setLoginStatus: response.data.msg})
             }else{
                localStorage.setItem("isAuthenticated", "true");
                 window.location = '/dashboard'
             }
         })
         

     }
     
    render() {
        ReactSession.setStoreType("localStorage");
        ReactSession.set("username", this.state.username);
        return (
            <div>
                <div className="login">
                    <img src={logo} className="login-logo"></img>
                    
                    <p className="err-msg">{this.state.setLoginStatus}</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password"
                            required
                            className='form-control'
                            value={this.state.password}
                            onChange={this.onChangePassword}/>
                        </div> 
                                           
                        <input type="submit" value="Login" className="info"></input>
                    </form>
                </div>
            </div>
        )
    }
}
