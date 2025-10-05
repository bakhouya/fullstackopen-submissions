import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import CountryDetails from './components/ContryDetail'
import Countries from './components/Countries'
function App() {
    // =========================================================================
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)
    // =========================================================================


    // =========================================================================
    // fetch all countries once
    useEffect(() => {
          countryService.getAll().then(initialPersons => {setCountries(initialPersons)})
    }, [])
    // =========================================================================

    // =========================================================================
    const filtered = countries.filter(c =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    // =========================================================================
      
    // =========================================================================
    const handleShowDetails = (id) => {
      countryService.getDetails(id)
        .then(data => {setSelectedCountry(data)})
        .catch(error => {console.error("Error fetching details:", error)})
    }
    // =========================================================================






    // =========================================================================
    return (
      <div>
        <h1>Countries</h1>
        <div>
          find countries: <input value={filter} onChange={e => setFilter(e.target.value)} />
        </div>

        {filtered.length > 10 && <p>Too many matches, specify another filter</p>}


        {/* // ========================================================================= */}
        {filtered.length <= 10 && filtered.length > 1 && (
          <Countries handleShow={handleShowDetails} countries={filtered} />
        )}
        {/* // ========================================================================= */}

        
        {/* // ========================================================================= */}
        {filtered.length === 1 && (
            <CountryDetails country={filtered[0]} />
        )}
        {/* // ========================================================================= */}


        {/* // ========================================================================= */}
        {selectedCountry && (
          <CountryDetails country={selectedCountry} />
        )}
        {/* // ========================================================================= */}

      </div>
    )
    // =========================================================================
}

export default App
