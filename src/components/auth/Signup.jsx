import { useContext, useRef, useState } from "react";
import { Button, Card, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginStatusContext from "../contexts/LoginStatusContext";

export default function Signup(props) {
  const userRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();
  const nav = useNavigate();
  const [loginStatus, setLoginStatus] = useContext(LoginStatusContext);
  const [error, setError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  const updateCanSubmit = () => {
    // reset error whenever user changes a field
    setError(false);
    setHasUser(false);

    setCanSubmit(
      Boolean(userRef.current?.value) &&
      Boolean(pwdRef.current?.value) &&
      Boolean(confirmPwdRef.current?.value)
    );
  };

  async function handleSignup(e) {
    e.preventDefault();

    if (pwdRef.current.value !== confirmPwdRef.current.value) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    // fetch existing users
    const res1 = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/login", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    });
    const data = await res1.json();

    // data.results contains the user objects
    const found = Object.values(data.results).some(
      user => user.username === userRef.current.value
    );

    if (!found) {
      const res2 = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/login", {
        method: "POST",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userRef.current.value,
          password: pwdRef.current.value
        })
      });

      if (res2.status !== 200) {
        alert("Signup failed! Please try again.");
        return;
      } else {
        alert("Signup successful!");
        sessionStorage.setItem("isLoggedIn", true);
        setLoginStatus(true);
        nav("/");
      }
    } else {
      // username already exists
      setHasUser(true);
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 shadow-lg" style={{ minHeight: "70vh" }}>
            <Card.Body className="d-flex flex-column h-100 justify-content-between">
              <div>
                <p className="text-center fs-5 mb-2">
                  Welcome to Foodie! Please sign up to continue.
                </p>
              </div>

              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <h2 className="text-center">Sign Up</h2>
              </div>

              <div>
                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      ref={userRef}
                      onChange={updateCanSubmit}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      ref={pwdRef}
                      onChange={updateCanSubmit}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      ref={confirmPwdRef}
                      onChange={updateCanSubmit}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={!canSubmit}
                  >
                    Sign Up
                  </Button>
                </Form>

                {!canSubmit && (
                  <Alert variant="danger" className="mt-3">
                    All fields are required.
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="mt-3">
                    Passwords do not match.
                  </Alert>
                )}

                {hasUser && (
                  <Alert variant="danger" className="mt-3">
                    Username is already taken.
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