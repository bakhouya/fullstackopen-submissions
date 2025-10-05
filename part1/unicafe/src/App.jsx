import { useState } from 'react'

// =============================================================================
// A simple component that renders a single row in the statistics table.
// It receives 'text' (the label of the statistic) and 'value' (the number) as props.
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
};



// A component that displays all the feedback statistics in a table.
// It uses the StatisticLine component to render each individual row.
// The props passed in are: good, neutral, bad, total, average, and positive.
const Statistics  = (props) => {
  return (
   <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average.toFixed(1)} />
        <StatisticLine text="positive" value={props.positive.toFixed(1) + " %"} />
      </tbody>
    </table>

  )
};


// A reusable Button component that renders a clickable button element.
// It takes two props:
// - onClick: a function that will be executed when the button is clicked
// - text: the label displayed inside the button
const Button = (props) => {
  return (
    <button onClick={props.onClick}> {props.text}  </button>
  )
};


export default function App() {

  
    // =============================================================================
    // State to store the number of "good" feedback clicks
    const [good, setGood] = useState(0)
    // State to store the number of "neutral" feedback clicks
    const [neutral, setNeutral] = useState(0)
    // State to store the number of "bad" feedback clicks
    const [bad, setBad] = useState(0)
    // =============================================================================


    // =============================================================================
    // Total number of feedback given (good + neutral + bad)
    const total = good + neutral + bad
    // Average score: good = 1, neutral = 0, bad = -1
    // If no feedback yet, average is 0
    const average = total === 0 ? 0 : (good - bad) / total
    // Percentage of positive feedback (good)
    // If no feedback yet, positive percentage is 0
    const positive = total === 0 ? 0 : (good / total) * 100
    // =============================================================================

  
    

    return (
      <div>
            {/* ============================================================================= */}
            {/* Section for all feedback-related buttons */}
            <div>
                <h1 className='title'>Give feedback</h1>
                <Button text="good" onClick={() => setGood(good + 1)} />
                <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
                <Button text="bad" onClick={() => setBad(bad + 1)} />
            </div>
            {/* ============================================================================= */}


            {/* ============================================================================= */}
            {/* Section to display feedback statistics */}
            {/* Shows "No feedback given" if no feedback yet, otherwise displays the Statistics table */}
            <div>
                  <h2 className='title'>Statistics</h2>
                  {total === 0 ? (
                    <div className="fedback-count">No feedback given</div>
                  ) : (
                    <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
                  )}         
            </div>
            {/* ============================================================================= */}
      </div>
    )
}

