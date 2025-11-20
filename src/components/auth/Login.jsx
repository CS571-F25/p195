import { useRef, useContext } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginStatusContext from "../contexts/LoginStatusContext";

export default function Login (props) {

    const userRef = useRef();
    const pwdRef = useRef();
    const nav = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(LoginStatusContext);

    async function handleLogin() {
        if (userRef.current.value == "" || pwdRef.current.value == "") {
            alert("Username and password cannot be empty!");
            return;
        }
        // This API call will always return 200 at the moment. TODO: find out how to send other status codes.
        const res = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/login?username=" + userRef.current.value + "&password=" + pwdRef.current.value, {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        if (res.status === !200) {
            alert("Login failed! Please check your username and password.");
            return;
        } else {
            alert("Login successful!");
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
            <Form.Group as={Row} style={{ marginBottom: "4rem" }}>
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control type="password" id="password" ref={pwdRef} />
            </Form.Group>
            <p></p>
            <p>WIP: all combinations of user/password will be accepted</p>
            <Button type="submit" variant="primary" className="justify-content-center w-100" onClick={handleLogin}>Log In</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}