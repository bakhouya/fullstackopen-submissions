import React from 'react'

export default function Persons ({persons, deleteItem}) {
  return (
    <div>
          <h1>Numbers</h1>
          {persons.length != 0 
          ? 
            <div>
                {persons.map((person, index) => {
                  return (
                    <div key={index}  className='item_person'>
                      {person.name} - {person.number}
                      <button onClick={() => deleteItem(person.id, person.name)}>delete</button>
                    </div>
                  )
                })}
            </div>
          :
              <div>persons not found </div>
          }
          
      </div>
  )
}
