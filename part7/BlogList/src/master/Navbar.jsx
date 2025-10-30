import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const HeaderApp = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { 
        logout() 
        navigate("/login")
  };

  const avatar = user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <header className="main-layout">
      <Navbar  variant="dark" expand="lg" className="header_app">
        <Container>
          
          <Navbar.Brand as={Link} to="/" className="logo_brand">BlogList</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/users">Users</Nav.Link>
                  <Nav.Link as={Link} to="/create">Create</Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="align-items-start">
              {isLoggedIn ? (
                <NavDropdown  className="no-caret user-dropdown" align="end" id="user-dropdown" menuVariant="dark"
                    title={
                        <span className="d-flex align-items-center">
                          <Image src={avatar} alt="user avatar" roundedCircle style={{ width: "34px", height: "34px", objectFit: "cover", marginRight: "8px",border: "2px solid #fff",}}/>
                        </span>}>

                  <NavDropdown.Item as={Link} to={'/users/'+user?.id} className="txt_base">
                      Profile <span className="">{user?.name}</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className=" txt_base">
                      Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderApp;
