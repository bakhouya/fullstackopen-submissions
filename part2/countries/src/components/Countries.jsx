import React from 'react'

export default function Countries({countries, handleShow}) {
  return (
     <ul>
        {countries.map(country => (
        <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShow(country.cca2)}>show</button>
        </div>
        ))}
    </ul>
  )
}
