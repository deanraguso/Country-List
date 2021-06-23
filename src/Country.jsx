import React from 'react'
import "./App.css"

export default function Country(props) {

    const {name, flag} = props.countryData;

    return (
        <div className="country">
        <img src={flag} width="100px" className="flag"></img>
        <h1>{name}</h1>
        </div>
    )
}
