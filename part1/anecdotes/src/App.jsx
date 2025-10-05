import { useState } from 'react'

// A reusable Button component that renders a clickable button element.
// It takes two props:
// - onClick: a function that will be executed when the button is clicked
// - text: the label displayed inside the button
const Button = (props) => {
  return (
    <button onClick={props.onClick}> {props.text}  </button>
  )
};




function App() {
      const anecdotes = [
            'If it hurts, do it more often.',
            'Adding manpower to a late software project makes it later!',
            'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            'Premature optimization is the root of all evil.',
            'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
            'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
            'The only way to go fast, is to go well.'
      ]
      // State to store the index of the currently selected anecdote
      const [selected, setSelected] = useState(0)
      // State to store the votes for each anecdote
      // Initialized as an array filled with zeros, one for each anecdote
      const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

      // Maximum number of votes received by any anecdote
      const maxVotes = Math.max(...votes)
      // Index of the anecdote with the highest votes
      // If multiple anecdotes are tied, indexOf returns the first one
      const topAnecdoteIndex = votes.indexOf(maxVotes)

      // =============================================================================
      // Function to select a random anecdote from the list
      const handleNextAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomIndex)
      }
      // Function to vote for the currently selected anecdote
      const handleVote = () => {
          const copy = [...votes]       
          copy[selected] += 1          
          setVotes(copy)               
      }
      // =============================================================================
  return (
    <>
        {/* ============================================================================= */}
        {/* Section for all feedback-related buttons */}
        <div>
            <Button text="next anecdote" onClick={handleNextAnecdote} />
            <Button text="vote" onClick={handleVote} />
        </div>
        {/* ============================================================================= */}

        {/* ============================================================================= */}
        {/* Section to display the currently selected anecdote and its vote count */}
        <div>
            <h2 className='title'>Anecdote of the day</h2>
            <div>{anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
        </div>
        {/* ============================================================================= */}


        {/* ============================================================================= */}
        {/* Section to display the anecdote with the most votes */}
        {/* Shows "No votes yet" if no votes have been cast */}
        <div>
            <h1 className='title'>Anecdote with most votes</h1>
              {maxVotes === 0 ? (
                <p>No votes yet</p>
              ) : (
                <>
                  <p>{anecdotes[topAnecdoteIndex]}</p>
                  <p>has {maxVotes} votes</p>
                </>
              )}
        </div>
        {/* ============================================================================= */}
    </>
  )
}

export default App
