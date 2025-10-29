import RouterUrl from './router';
import { RouterProvider} from "react-router-dom";

const App = () => {
  // const location = useLocation();
  // const [anecdotes, setAnecdotes] = useState([
  //   {
  //     content: 'If it hurts, do it more often',
  //     author: 'Jez Humble',
  //     info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
  //     votes: 0,
  //     id: 1
  //   },
  //   {
  //     content: 'Premature optimization is the root of all evil',
  //     author: 'Donald Knuth',
  //     info: 'http://wiki.c2.com/?PrematureOptimization',
  //     votes: 0,
  //     id: 2
  //   }
  // ])

  // const [notification, setNotification] = useState('')



  // const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {...anecdote, votes: anecdote.votes + 1}

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    // <div>
    //   <h1>Software anecdotes</h1>
    //   <Menu />
    //   <AnecdoteList anecdotes={anecdotes} />
    //   <About />
    //   <CreateNew addNew={addNew} />
    //   
    // </div>
    <RouterProvider router={RouterUrl}></RouterProvider>
  )
}

export default App
