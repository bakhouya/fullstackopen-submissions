const Total = (props) =>{
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);


    return (    
        <p>Total {total} of exercises </p> 
    )
}; 
export default Total ;