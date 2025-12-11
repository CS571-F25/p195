import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from 'react-router'
import Home from './components/content/Home'
import AboutMe from './components/content/AboutMe'
import FoodieLayout from './components/structural/FoodieLayout'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'
import Recipe from './components/content/Recipe'
import Explore from './components/content/Explore'
import AddPost from "./components/content/AddPost";

function App() {

    const [fullRecipes, setFullRecipes] = useState({});

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/full-recipes", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    })
      .then(res => res.json())
      .then(data => {
        setFullRecipes(data.results);
      });
  }, []);

  return <HashRouter>
    <Routes>
      <Route path="/" element={<FoodieLayout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/about" element={<AboutMe/>}></Route>
        <Route path="/recipe/:name" element={<Recipe fullRecipes={fullRecipes} />} />
        <Route path="/addpost" element={<AddPost />}></Route>
      </Route>
    </Routes>
  </HashRouter>
}

export default App
