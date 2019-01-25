import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      value: '',
      data: [],
      repoDetails: null,
    }
  }

  handleChange = (e) => {
    var val = e.target.value;
    this.setState({
      value: val
    })
  }

 handelrepo = repo => (e) => {
  const url = `https://api.github.com/repos/${repo.full_name}/commits`;
  fetch(url).then(res => res.json()).then(data => this.setState({
    repoDetails: {name:repo.name, description: repo.description, commits: data.splice(0, 5)}
  }))
 }


 handleSubmit = (e) => {
  e.preventDefault();
  fetch(`https://api.github.com/orgs/${this.state.value}/repos`).then(res => res.json()).then(d => this.setState({
    data: d,
    value: ''
  }))
 }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        
          <h1><i className="fab fa-github"></i>GitHub Organization Repo Details</h1>
        </header>
        <div className="main-container">
          <div>
            <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} placeholder="Search Org" value={this.state.value} id="input"/>
            </form>  
          </div>       
          <div className="main_list">
            <div>
            <h1>Repo List</h1>
              {
                this.state.data && this.state.data.map((val, i) => {
                  return <h4 onClick={this.handelrepo(val)}>{val.full_name}</h4>
                })
              }
            </div>

            <div>
            <h1>Repo Details</h1>
              {this.state.repoDetails && (<h4>{this.state.repoDetails.name}</h4>)}
              {
               this.state.repoDetails && this.state.repoDetails.commits.map(val => {
                  return (
                  <div className="commits-list">
                  <h3>Author Name: {val.author.login}</h3>
                  <p><b>Commit Msg</b>: {val.commit.message}</p>
                  </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
