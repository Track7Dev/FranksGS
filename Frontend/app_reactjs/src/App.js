import React, { Component } from 'react';
import './App.css';
import logo from './assets/logo.png';
import bulletA from './assets/bulletA.png';
import bulletB from './assets/bulletB.png';
import arrowBack from './assets/arrow_back.png';
import {Admin_Login, Admin_Tools, Home, Search, Events} from './components';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
const server = require('./config').server;

class App extends Component {
  constructor(){
    super();
    this.state = {cTab: null, sTab: null};
  }

  animateBullet = (tabNumber) => {
    document.getElementsByName("cTab").forEach((tab) => {
      tab.style.opacity = '0.3';
    });
    document.getElementsByName("sTab").forEach((tab) => {
      tab.style.opacity = '0.3';
    });
    document.getElementsByName("bullet").forEach((tab, i) => {
      if(tabNumber === i+1) {tab.style.left = 0};
      if(tabNumber !== i+1) tab.style.left = '-150px';
    });
  };
  toggle_nav = () => {
    const nav = document.getElementById("App-content-nav");
    const tabs = document.getElementById("App-content-nav-tabs-wrap");
    let isOpen = false;
    if(nav.style.width === "0.5%") isOpen = false;
    if(nav.style.width !== "0.5%") isOpen = true;
    isOpen = !isOpen;
    if(isOpen){ tabs.style.opacity = 1; return nav.style.width = "30%"};
    if(!isOpen){ tabs.style.opacity = 0; return nav.style.width = "0.5%"};
  };
  render() {
    let adminOn;
    document.addEventListener('keydown', function(event) {
      if(event.altKey && event.ctrlKey && event.key == "l" && !window.localStorage.getItem('token')) {
          window.localStorage.setItem('ALS', true);
          window.location.replace('/admin');
      }
    });
    if(window.localStorage.getItem('token')){
      //verify admin
      adminOn = <Admin_Tools parent={this}/>;  
    }
    return (
      <div className="App">
        <header className="App-header">
          
          <img id='App-header-logo' src={logo}/>
          <span style={{width: '60%'}} /> 
          <div id='App-header-contact' >
            <p>
              Address:<br/>
              Phone: 
            </p>
          </div>
        </header>
        
        <div id="App-header-nav">
          <Link  to="/" className="App-header-nav-tab" onClick={() => this.animateBullet(1)}>
            <img src={bulletA} name="bullet" height="100%" width="100%" />
            <div className="bullet-name">HOME</div>
          </Link>
          <div className="App-header-nav-tab" onClick={() => this.animateBullet(2)}>
            <img src={bulletB} name="bullet" height="100%" width="100%" />
            <div className="bullet-name">GALLERY</div>
          </div>
          <Link to="/Events"  className="App-header-nav-tab" onClick={() => this.animateBullet(3)}>
            <img src={bulletA} name="bullet" height="100%" width="100%" />
            <div className="bullet-name">EVENTS</div>
          </Link>
          <div className="App-header-nav-tab" onClick={() => this.animateBullet(4)}>
            <img src={bulletB} name="bullet" height="100%" width="100%" />
            <div className="bullet-name">HOURS</div>
          </div>
          <div className="App-header-nav-tab" onClick={() => this.animateBullet(5)}>
            <img src={bulletA} name="bullet" height="100%" width="100%" />
            <div className="bullet-name">ABOUT</div>
          </div>
          <div className="App-header-nav-tab" onClick={() => this.animateBullet(6)}>
            <img src={bulletB} name="bullet" height="100%" width="100%" />
            <div className="bullet-name">CONTACT</div>
          </div>
        </div>
        {adminOn}
        <div id='App-content'> 
          <div id='App-content-nav'>
            <div id="App-content-nav-tabs">
              <div id="App-content-nav-tabs-wrap">
                <div className="App-content-nav-tabs-tab"/>
                <div className="App-content-nav-tabs-tab"/>
                <div className="App-content-nav-tabs-tab"/>
                <div className="App-content-nav-tabs-tab"/>
              </div>
            </div>
            <div id="App-content-nav-toggle" onClick={() => this.toggle_nav()}>
              <img src={arrowBack} width="50%"/>
            </div>
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin_Login} />
          <Route path="/events" component={Events} />
          <Route path="/search" name="search" component={() => {
            return <Search selected={[this.state.cTab, this.state.sTab]} />
          }} />
          <div id='App-content-gun_select'>
            <img className='App-content-gun_select-item' src={require('./assets/glock_logo.png')}/>
            <img className='App-content-gun_select-item' src={require('./assets/sw_logo.png')}/>
            <img className='App-content-gun_select-item' src={require('./assets/ruger_logo.png')}/>
            <img className='App-content-gun_select-item' src={require('./assets/sig-sauer_logo.png')}/>
            <img className='App-content-gun_select-item' src={require('./assets/remington_logo.png')}/>
            <img className='App-content-gun_select-item' src={require('./assets/mossberg_logo.png')}/>
          </div>
        </div>
        <footer id='App-footer'> Track Seven Development 2017 </footer>
      </div>
    );
  }
}

export default App;
