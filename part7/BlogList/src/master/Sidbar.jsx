import { Link } from "react-router-dom";

const SidbarApp = () => {

  return (
      <nav  variant="dark" expand="lg" className="sidbar_app">
            <Nav className="sidbar_items">
                <Nav.Link className="sidbar_item txt_base" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="sidbar_item txt_base" as={Link} to="/create">Create</Nav.Link>
                <Nav.Link className="sidbar_item txt_base" as={Link} to="/users">Users</Nav.Link>
            </Nav>
      </nav>
  );
};

export default SidbarApp;
