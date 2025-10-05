


// ======================================================
const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);
// ======================================================
const  Content= (props) => {
  return (
    <div>
        {props.parts.map((part, i) => <Part key={i} name={part.name} exercises={part.exercises} />)}
    </div>
  )
};
export default Content ;