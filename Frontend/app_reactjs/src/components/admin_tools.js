import React, { Component } from 'react';
import { setTimeout } from 'timers';
import { Link } from 'react-router-dom';
import axios from 'axios';
const server = require('../config').server;

class Admin_Tools extends Component {
  constructor(props){
    super(props);
    this.parent = props.parent;
  }

  select = (index, id) => {
    document.getElementsByName('bullet').forEach((tab) => {
      tab.style.left = '-150%';
    });
    document.getElementsByName(id).forEach((tab, i) => {
      if(i === index) tab.style.opacity = 1;
      if(i !== index) tab.style.opacity = '0.3';
    });

    this.parent.setState({
      [id]: index
    });

  }

  logout = () => {
    window.localStorage.removeItem('token');
    window.location.replace('/');
  }
  render(){
    return(
      <div id="Admin-tools">
        <div style={{display: 'flex', alignItems: 'center', width: '10%', paddingLeft: '1%', paddingRight: '1%', fontSize: '1.4vh', height: '100%', background: 'rgb(43, 43, 43)'}}>Aministration Tools v0.1 Beta</div>
        <div id="Admin-tools-controls" >
          <div name="cTab" className="Admin-tools-controls-tab" >C</div>
          <div name="cTab" className="Admin-tools-controls-tab" >R</div>
          <div name="cTab" className="Admin-tools-controls-tab" >U</div>
          <div name="cTab" className="Admin-tools-controls-tab" >V</div>
        </div>
        <Link to="/search" id="Admin-tools-selector" >
          <div name="sTab" className="Admin-tools-selector-tab" onClick={() => this.select(0, "sTab")}>ADMIN USER</div>
          <div name="sTab" className="Admin-tools-selector-tab" onClick={() => this.select(1, "sTab")}>ITEM</div>
          <div name="sTab" className="Admin-tools-selector-tab" onClick={() => this.select(2, "sTab")}>DEAL</div>
        </Link>
        <div id="Admin-tools-search" >
          <label>Find: </label> <input />
          <div style={{background:'black', height: '100%', display: 'flex',justifyContent: 'center',borderLeft: '1px solid white', alignItems: 'center', width: '15%', cursor: 'pointer'}}>Search</div>
        </div> 
        <div id="Admin-tools-active_users" >
          A: <div>234</div> 
          V: <div>7</div>
        </div> 
        <div onClick={() => this.logout()} id="Admin-tools-logout">
          LOGOUT
        </div>
      </div> 
    );
  }
}

export default Admin_Tools;