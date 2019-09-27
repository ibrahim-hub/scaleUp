import React, { Component } from 'react'
import './login.css'
import AppinessLogo from '../logo/logo';
import { Redirect } from 'react-router-dom';

export default class login2 extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isAuthenticated:false
        }
    }


    submitLogin=()=>{
        
        let str = localStorage.getItem('post');
        var username = "";
        var password = "";
        var email = "";
        if(str){
            var obj = JSON.parse(str);
            var username = obj.username;
            var password = obj.password;
            var email = obj.email;
        }
        const post = {
            username: username,
            password: password,
            email: email
        };
        if(str){
            var obj = JSON.parse(str);
        }
        let post_data = localStorage.getItem('post_data');
        var myObj = "";
        if(post_data){
            myObj = JSON.parse(post_data);
        }
        var timestamp = new Date().getUTCMilliseconds();
        let ab = { [timestamp]:obj, [timestamp]:myObj };
        localStorage.setItem('post_data', JSON.stringify(ab));
       

       this.setState({
            isAuthenticated:true
        })
    }

    render() {
        let str = localStorage.getItem('post');
        var username = "";
        var password = "";
        var email = "";
        if(str){
            var obj = JSON.parse(str);
            var username = obj.username;
            var password = obj.password;
            var email = obj.email;
        }

        let authRedirect = null;
        if (this.state.isAuthenticated) {
            authRedirect = <Redirect to='/dashborad' />
        }

       return (
            <div className="login-card">
            {authRedirect} 
            <AppinessLogo />
            
            <table>
                <tr><td>User Name :  {username}</td></tr>
                <tr><td>Email :  {email}</td></tr>
                <tr><td>password :  {password}</td></tr>
            </table>
           <br/>

           <input type="submit" name="submit" onClick={this.submitLogin}  className="login login-submit" value="Submit" />

            <input type="submit" name="login"  onClick={this.props.previousStep} className="login login-submit" value="Previous" />
             
            </div>
        )
    }
}
