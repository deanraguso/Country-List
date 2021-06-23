import React, { Component } from 'react'
import "./App.css"
import Country from "./Country"

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {name: "Dean", data: [], raw_data: []}

    this.updateResults = this.updateResults.bind(this);
  }

  updateResults() {
    let query = document.querySelector("input").value;
    if (query.length > 1){
      query = query[0].toUpperCase() + query.slice(1);
    }
    console.log(query)
    this.setState({data: this.state.raw_data.filter(element => element.name.includes(query)) })
  }

  async componentDidMount(){
    let data = await (await fetch("https://restcountries.eu/rest/v2/all")).json();
    this.setState({raw_data:data, data:data});
  }
  
  render() {
    const {data} = this.state;
    console.log(this.state)
    return (
      <div className="country-app">
        <h1>Country App</h1>
        <strong><p>Welcome {this.state.name}</p></strong>
        <input type="text" className="text-input" onChange={this.updateResults}/>
        
        <section className="all-countries">
          {data.map(country => {
            return <Country key={country.name} countryData={country}/>
          })}
        </section>

      </div>
    )
  }
}