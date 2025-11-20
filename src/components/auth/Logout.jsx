import { useContext, useEffect } from "react";
import { useNavigate } from "react-router"
import LoginStatusContext from "../contexts/LoginStatusContext";

export default function Logout (props) {

    const nav = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(LoginStatusContext);

    useEffect(() => {
        sessionStorage.setItem("isLoggedIn", false);
        setLoginStatus(false);
        alert("You have been logged out.");
        nav("/");
    }, []);


    return <div>
        <h1>Log out!</h1>
        <p>You have been successfully logged out.</p>
    </div>
}