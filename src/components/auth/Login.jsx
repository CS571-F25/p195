import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginStatusContext from "../contexts/LoginStatusContext";


export default function Login() {
  const [users, setUsers] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginStatus, setLoginStatus] = useContext(LoginStatusContext);


  const nav = useNavigate();

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/login", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data.results);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const found = Object.values(users).some(
      user => user.username === username && user.password === password
    );

    if (found) {
      alert("Login successful!")
      sessionStorage.setItem("isLoggedIn", true);
      setError(false);
      setLoginStatus(true);
      nav("/"); // navigate to home if desired
    } else {
      setLoginStatus(false);
      setError(true);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 shadow-lg" style={{ minHeight: "70vh" }}>
            <Card.Body className="d-flex flex-column h-100 justify-content-between">
              {/* Top section */}
              <div>
                <p className="text-center fs-5 mb-2">
                  Welcome back! Please sign in to continue.
                </p>
              </div>

              {/* Middle section: centered Login heading */}
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <h2 className="text-center">Login</h2>
              </div>

              {/* Bottom section: form + button + alerts */}
              <div>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={!username || !password}
                  >
                    Login
                  </Button>
                </Form>

                {(!username || !password) && (
                  <Alert variant="danger" className="mt-3">
                    All fields are required.
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="danger" className="mt-3">
                    Username or password is incorrect.
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}