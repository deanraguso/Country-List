import React, { Component } from 'react'
import "./App.css"

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {name: "Dean", data: []}

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){

  }

  async componentDidMount(){
    let data = await (await fetch("https://restcountries.eu/rest/v2/all")).json();
    this.setState({data:data});
  }
  
  render() {
    const {data} = this.state;
    console.log(this.state)
    return (
      <div className="country-app">
        <h1>Country App</h1>
        <strong><p>Welcome {this.state.name}</p></strong>
        <input type="text" className="text-input" />
        <button onClick={this.handleClick} >Click Me!</button>

        <ol>
          {data.map(country => {
            return (
            <li key={country.name}>
              {country.name}
            </li>
              )
          })}
        </ol>

      </div>
    )
  }
}