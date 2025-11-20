import { useContext, useRef } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginStatusContext from "../contexts/LoginStatusContext";

export default function Signup (props) {

    const userRef = useRef();
    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const nav = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(LoginStatusContext);

    async function handleSignup() {
        if (userRef.current.value == "" || pwdRef.current.value == "" || confirmPwdRef.current.value == "") {
            alert("Fields cannot be empty!");
            return;
        } else if (pwdRef.current.value !== confirmPwdRef.current.value) {
            alert("Passwords do not match!");
            return;
        }
        const res = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/login", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userRef.current.value,
                password: pwdRef.current.value
            })
        })
        if (res.status !== 200) {
            alert("Signup failed! Please try again.");
            return;
        } else {
            alert("Signup successful!");
            sessionStorage.setItem("isLoggedIn", true);
            setLoginStatus(true);
            nav("/");
        }
    }

    return (
    <div className = "d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <Card style={{ width: "35rem", padding: "4rem", height: "auto" }}>
        <Card.Body>
          <Card.Title className="text-center fs-1">Login</Card.Title>
          <Form>
            <Form.Group as={Row}>
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control type="text" id="username" ref={userRef} />
            </Form.Group>
            <p></p>
            <Form.Group as={Row} >
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control type="password" id="password" ref={pwdRef} />
            </Form.Group>
            <p></p>
            <Form.Group as={Row} style={{ marginBottom: "4rem" }}>
              <Form.Label htmlFor="confirmPassword"> Confirm Password:</Form.Label>
              <Form.Control type="password" id="confirmPassword" ref={confirmPwdRef} />
            </Form.Group>
            <p></p>
            <Button type="submit" variant="primary" className="justify-content-center w-100" onClick={handleSignup}>Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}