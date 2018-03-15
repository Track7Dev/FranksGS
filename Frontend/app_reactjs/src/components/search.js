import React, { Component } from 'react';
import axios from 'axios';
import noImg from '../assets/noimg.jpg';
const server = require('../config').server;

class Search extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {selected: this.props.selected, display: <div />};
  }

  filter = () => {
    if(this.state.selected[1] === 0) {
      axios.get(`${server}/search/admin`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => {
        console.log(res.data);
        let display = [];
        res.data.forEach((admin, i) => {
          display.push(
            <div key={i} className="Admin-search-user">
              <div>
                <img 
                onError={(e) => e.target.src = noImg}
                src={`${server}/admin/${admin.username}/profile.png`}
                />
              </div>
              <p>{admin.username}</p> 
            </div>
          );
        })
        this.setState({
          display: 
          <div>
            <div style={{width: '98%', background: 'red', borderBottom: '1px solid black', padding: '1%', color: 'white'}}> Administrator Users </div>
            <div className="Admin-search-display"> 
            
            {display}
            </div>
          </div>
        });
      })
      .catch((err) => {
        alert(err);
      });
      
    };
    if(this.state.selected[1] === 1) {
      axios.get(`${server}/item/all`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => {
        let display = [];
        res.data.forEach((item, i) => {
          display.push(
            <div key={i} className="Admin-search-user">
              <div>
                <img 
                onError={(e) => e.target.src = noImg}
                src={`http://localhost:7777/items/${item.make}/${item.model}.png`}
                />
              </div>
              <p>{item.model}</p> 
            </div>
          );
        })
        this.setState({
          display: 
          <div>
            <div style={{width: '98%', background: 'red', borderBottom: '1px solid black', padding: '1%', color: 'white'}}> ITEMS </div>
            <div className="Admin-search-display"> 
            
            {display}
            </div>
          </div>
        });
      })
      .catch((err) => {
        alert(err);
      });
    };
    if(this.state.selected[1] === 2) {
      axios.get(`${server}/item/deal/all`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => {
        let display = [];
        res.data.forEach((deal, i) => {
          axios.get(`${server}/item/${deal.itemId}`)
          .then((r) => {
            const item = r.data;  
            display.push(
              <div key={i} className="Admin-search-user">
                <div>
                  <img 
                  onError={(e) => e.target.src = noImg}
                  src={`http://localhost:7777/items/${item.make}/${item.model}.png`}
                  />
                </div>
                <p>{item.model}</p> 
              </div>
            );
          })
          .catch((e) => {
            alert(e);
          });
        })
        this.setState({
          display: 
          <div>
            <div style={{width: '98%', background: 'red', borderBottom: '1px solid black', padding: '1%', color: 'white'}}> DEALS </div>
            <div className="Admin-search-display"> 
            {display}
            </div>
          </div>
        });
      })
      .catch((err) => {
        alert(err);
      });
    };
    
  }

  componentDidMount(){
    this.setState({selected: this.props.selected });
    this.filter();
  }
  render() {
    if(!window.localStorage.getItem('token')) return window.location.replace('/');
    return (
      <div id="App-content-info" >
        {this.state.display}
      </div>
    );
  }
}

export default Search;