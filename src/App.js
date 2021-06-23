import React, { Component } from 'react'
import "./App.css"
import Country from "./Country"

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {name: "Dean", data: [], raw_data: []}

    this.updateResults = this.updateResults.bind(this);
  }

  async grabRelated(query){

    const query_group = ["rel_trg", "rel_par"]

    let terms = [];

    for(let i=0 ; i<query_group.length ; i++){

      let queries = await (await fetch("https://api.datamuse.com/words?" + query_group[i] + "=" + query)).json();
    
      queries = queries.map((q) => {
        let {word} = q;
        return word;
      })

      Object.assign(terms, queries);

    }

    return terms;
  }

  async updateResults() {
    let query = document.querySelector("input").value;
    let terms =  await this.grabRelated(query);
    terms.push(query);

    let results = [];

    terms.forEach(term => {
      Object.assign(results,this.state.raw_data.filter(element => element.name.toLowerCase().includes( term ))); 
    })

    results = results.filter((obj, index, self)=> {
      return index === self.findIndex((t) => {
        return t.place === obj.place && t.name === obj.name;
      })
    })

    this.setState({data: results});
  }

  async componentDidMount(){
    let data = await (await fetch("https://restcountries.eu/rest/v2/all")).json();
    this.setState({raw_data:data, data:data});
  }
  
  render() {
    const {data} = this.state;
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