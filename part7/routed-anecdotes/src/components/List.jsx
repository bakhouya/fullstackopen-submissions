
import { Link } from "react-router-dom";
import Votes from "./Vote" ;
import Delete from "./Delete" ;

const Card = ({anecdotes}) => {

    return (
        <div className="cards">
            {anecdotes.map(anecdote => (
                <div key={anecdote.id} className="card">
                    <div className="header_card"></div>
                    <div className="body_card">
                        <Link to={'/anecdotes/'+ anecdote.id} className="text-multiline">{anecdote.content}</Link>
                        <div className="txt_base">{anecdote.author}</div>
                    </div>
                    <div className="hr_card"></div>
                    <div className="footer_card">
                        <Votes anecdote={anecdote} />
                        <div className="slash"></div>
                        <Delete anecdote={anecdote.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Card