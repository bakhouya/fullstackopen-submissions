
import './App.css'

// ======================================================
const Header = ({ course }) => {
  return (
    <div>{course}</div>
  )
};
// ======================================================


// ======================================================
const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);
// ======================================================


// ======================================================
const  Content= ({ parts }) => {
  return (
    <div>
        {parts.map((part, i) => <Part key={i} name={part.name} exercises={part.exercises} />)}
    </div>
  )
};
// ======================================================



// ======================================================
const Total = ({ parts }) =>{
   const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (    
       <p>Number of exercises {total}</p> 
  )
}; 
// ======================================================

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}



export default function App() {
  // ============== = her we define variables ================
  const course = 'Half Stack application development';
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];

  // ================ her we return the jsx and use variables ==============
  return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
    </div>
  )
  // ================ her we return the jsx and use variables ==============
}


