import React, { Component } from 'react'
import "./App.css"
import Country from "./Country"

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
        
        <section className="all-countries">
          {data.map(country => {
            return <Country key={country.name} countryData={country}/>
          })}
        </section>

      </div>
    )
  }
}