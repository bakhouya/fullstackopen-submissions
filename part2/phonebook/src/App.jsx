import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter '
import PersonForm from './components/PersonForm '
import Persons from './components/Persons '
import NotificationBar from './components/Notification'
import personService from './services/Persons'

function App() {
    // ================================================================================
    // State: phonebook contacts
    const [persons, setPersons] = useState([])
    // State: form input values
    const [formData, setFormData] = useState({name: '', number: ''})
    // State: form input values
    const [search, setSearch] = useState('')
    // State : from nitifications meesages when succsess or error operations 
    const [notification, setNotification] = useState([])
    // ================================================================================


    // ================================================================================
    // Filter persons by search (case-insensitive)
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    // ================================================================================


    // ================================================================================
    // Handle input changes dynamically (name/number)
    const handleChangeField = (e) => {
        const { name, value } = e.target
        setFormData({...formData,[name]: value})
    }
    // ================================================================================

    // ================================================================================
    // Handle form submit: validate, check duplicates, add new person if alredy exites we change number if user confirm that
    const handleSubmit = (event) => {
      event.preventDefault() 

      if (formData.name.trim() !== '' && formData.number.trim() !== '') {
        const newPerson = { name: formData.name, number: formData.number }
        
        const exists = persons.find(p => p.name === formData.name)

        if (exists) {
          if (window.confirm(`${formData.name} is already added. Replace the old number with new one?`)) {
            personService.update(exists.id, newPerson)
              .then(updated => {
                setPersons(persons.map(p => p.id !== exists.id ? p : updated))
                setFormData({ name: '', number: '' })
                showNotification(`Updated ${updated.name}`, 'success')
              }).catch(error => {
                console.error(error.response?.data || error.message)
                showNotification(`Information of ${formData.name} has already been removed from server`, 'error')
                setPersons(persons.filter(p => p.id !== exists.id))
              })
          }
        } else {
          personService.create(newPerson)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setFormData({ name: '', number: '' })
              showNotification(`Added ${returnedPerson.name}`, 'success')
            }).catch(error => {
                const backendMessage = error.response?.data?.error || 'Failed to add person.'
                showNotification(backendMessage, 'error')
            })
        }

      } else {
        alert(`fields are required`)
        return
      }
    }

    // ================================================================================

    // ================================================================================
    //  handle delete item person by ID from server json
    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
          personService.remove(id).then(() => {
            setPersons(persons.filter(p => p.id !== id))
            showNotification(`Removed Succsessfuly`, 'success')
          }).catch(() => {
              showNotification(`Somthing happed tray gain.`,'error')
            })
        }
    }
    // ================================================================================

    // ================================================================================
    //  handle show notification message 
    const showNotification = (message, type='success') => {
        setNotification({ message, type })
    }
    // ================================================================================



    // ================================================================================
    //  get all preson list from server db.json
    useEffect(() => {
          personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
          })
    }, [])
    // ================================================================================

    // ================================================================================
    // Render app: title, filter, form, and list of persons
    return (
      <div className='container-app'>
        <div className="box-form">
        <h1>PhoneBook</h1>
            <NotificationBar  message={notification?.message} type={notification?.type} />

            <Filter value={search} change={(e) => setSearch(e.target.value)} />
            <div>Add new person</div>
            <PersonForm form={formData} change={handleChangeField} submit={handleSubmit} />
         </div>

        <div className="persons_list"><Persons persons={filteredPersons} deleteItem={handleDelete}/></div>
        

      </div>
    )
  // ================================================================================
}

export default App
