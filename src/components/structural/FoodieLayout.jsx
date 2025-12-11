import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import LoginStatusContext from "../contexts/LoginStatusContext";


function FoodieLayout(props) {

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const [loginStatus, setLoginStatus] = useState(isLoggedIn === "true");

    return (
        <div>
            {/* Top Navigation Bar */}
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="me-auto px-3">Foodie</Navbar.Brand>
                    <Nav className="ms-auto px-3">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
                        { !loginStatus && <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </> }
                        { loginStatus && 
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        }
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/addpost">New Post</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {/* Main Content Area */}
            <div style={{ margin: "1rem", display: "flex", justifyContent: "center" }}>
                <LoginStatusContext.Provider value={[ loginStatus, setLoginStatus ]}>
                    <Outlet />
                </LoginStatusContext.Provider>
            </div>
        </div>
    )
}

export default FoodieLayout;