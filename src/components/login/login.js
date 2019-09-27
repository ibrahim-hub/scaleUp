import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../actions/action';
import './login.css'
import { Redirect } from 'react-router-dom';
import AppinessLogo from '../logo/logo';
import {checkValidity} from '../../validition/validition';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email:''
    };
    this.onChangeHandeler = this.onChangeHandeler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

    componentWillMount() {
        localStorage.setItem('post', '');
    }
  

  onChangeHandeler(e) {
    this.setState({ [e.target.name]: e.target.value });
    var  rules = "";
        var filedName = "";
        if(e.target.name == "email"){
            rules = {'required':true, 'isEmail':true };
            filedName = "Email-Id"
        }
        if(e.target.name == "password"){
            rules = {'required':true, 'minLength':4 };
            filedName = "Password"
        }
        if(e.target.name == "username"){
            rules = {'required':true, 'minLength':4 };
            filedName = "User Name"
        }
        let validation =  checkValidity( e.target.value, rules, filedName)
        this.setState({ 'errormsg': validation });
  }


  submitHandler(e) {
    e.preventDefault();
    const post = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
    };
    if(this.state.username && this.state.password && this.state.email){
        localStorage.setItem('post', JSON.stringify(post));
        this.props.nextStep(post);
        //this.props.auth(post);
    }else{
        this.setState({ 'errormsg': 'Please enter username and password' });
    }
    
  }

 
  render() {
    let errorMessage = null;
    if (this.props.newPost.error) {
        errorMessage = (
            <p className="error-msg">{this.props.newPost.error}</p>
        );
    }

    let errorMg = null;
    if (this.state.errormsg) {
        errorMg = (
            <p className="error-msg">{this.state.errormsg}</p>
        );
    }
    let auth = localStorage.getItem("token");

    let authRedirect = null;
        if (this.props.newPost.isAuthenticated || auth) {
            authRedirect = <Redirect to='/dashborad' />
        }
    return (
        <div className="login-card">
        <AppinessLogo />
        {authRedirect} 
        {errorMessage}
        {errorMg}
        <form onSubmit={this.submitHandler}>
            <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={this.state.username} 
            onChange={this.onChangeHandeler}  
            />
            <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={this.state.email} 
            onChange={this.onChangeHandeler}  
            />
            <input 
            type="password" 
            name="password" 
            placeholder="Password"
            value={this.state.password} 
            onChange={this.onChangeHandeler} 
            />
            <input type="submit" name="login" className="login login-submit" value="Next" />
        </form>   
    </div>  
    );
  }
}

Login.propTypes = {
  auth: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
  });

export default connect(mapStateToProps, { auth })(Login);
