import { BrowserRouter as path,  createBrowserRouter} from "react-router-dom";
import CreateNew from './components/Create'
import AnecdoteList from './components/anecdotes'
import About from './components/About'
import Item from "./components/Item";

import Master from "./master";
export  const RouterUrl = createBrowserRouter([
    
    {
        element : <Master/>,
        children: [
            {path: '/' , element : <AnecdoteList/>}, 
            {path: '/create' , element : <CreateNew/>}, 
            {path: '/about' , element : <About/>}, 
            {path: '/anecdotes/:id' , element : <Item/>}, 

        ]
    }
   
]) 
export default RouterUrl;