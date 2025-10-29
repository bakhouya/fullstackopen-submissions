import {Link} from "react-router-dom";

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
        <header className="header_app">
            <div className="text_logo">Anecdote</div>
            <div className="nav_items">
                <Link to={'/'} style={padding}>Anecdotes</Link>
                <Link to={'/create'} style={padding}>create</Link>
                <Link to={'/about'} style={padding}>About</Link>
            </div>
        </header>
      
    )
}
export default Menu