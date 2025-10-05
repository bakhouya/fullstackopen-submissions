import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'
export default function Course({courses}) {
  return (
    <div>
        <h1>Web Development Curriculum</h1>
        {courses.map((course, index) => {
            return (
                <div key={index}>
                    <br />
                    <Header title={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )
        })} 
    </div>
  )
}
