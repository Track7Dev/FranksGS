import React, {Component} from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';
import noImg from '../assets/noimg.jpg';
const server = require('../config').server;

class Home extends Component {
  constructor(){
    super();
    this.state = {display: []}
  }

  componentDidMount(){
    axios.get(`${server}/item/deal/all`, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {
      this.setState({
        display: res.data
      });
    })
    .catch((e) => alert(e));
  }

  render(){
    let display = [];
    
    window.localStorage.setItem('ALS', false);
    return(
      <div id='App-content-info'>
        <div id="App-content-welcome_photo">
              <div id="App-content-welcome_photo-img">
                <img src={logo} width="100%" height="100%"/>
              </div>
            </div>
            <div className="App-content-header"> DEALS </div>            
            <div id="App-content-deals" >
              <div id="App-content-deals-wrap">               
                {this.state.display.map((item, i) => 
                  <div key={i} className="App-content-deals-item">
                    <img src={`${server}/items/${item.itemId.make}/${item.itemId.model}`} onError={(e) => e.target.src = noImg} width="90%"/>
                    <br/>
                    <div>MAKE: {item.itemId.make}</div>
                    <div>MODEL: {item.itemId.model}</div>
                    <div>PRICE: ${item.itemId.price}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="App-content-header"> NEA NEWS </div>
            <div id="App-content-nea_news">
              <div id="App-content-nea_news-wrap">
                <div id="App-content-nea_news-banner"/>
                <div id="App-content-nea_news-article-wrap">
                  <div className="App-content-nea_news-article"/>
                  <div className="App-content-nea_news-article"/>
                </div>  
              </div>
            </div>
      </div>
    );
  }
}

export default Home;