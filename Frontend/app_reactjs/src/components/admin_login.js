import React, { Component } from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';
const server = require('../config').server;

class Admin_Login extends Component {
  login = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios.post(`${server}/admin/login`, {username, password})
    .then((res) => {
      window.localStorage.setItem('token', res.data.token);
      console.log("Successfully Logged In");
      document.getElementById('App-content-admin_login-wrap').style.background = "green";
      setTimeout(()=>  window.location.replace('/'), 500);
     
    })
    .catch((err) => {
      console.log("Credientials Did Not Match");
      document.getElementById('App-content-admin_login-wrap').style.animation = "shake 0.4s alternate-reverse";   
      setTimeout(() => document.getElementById('App-content-admin_login-wrap').style.animation = "none", 700);
    });
  }
  render(){
    if(window.localStorage.getItem('ALS') === 'false') window.location.replace('/');
    if(window.localStorage.getItem('ALS') === 'true')
    return (
      <div id="App-content-info" >
        <div id="App-content-admin_login">
          <div id="App-content-admin_login-wrap">
            <form onSubmit={(e) => this.login(e)}>
              <div>ADMIN LOGIN</div>
              <br />
              <br />              
              <label>USERNAME</label>
              <input type="text" name="username" autofocus="true"/>
              <label>PASSWORD</label>
              <input type="password" name="password" />
              <input type="submit" hidden/>
            </form>  
          </div>
        </div>
      </div>
    );
  }
}

export default Admin_Login;