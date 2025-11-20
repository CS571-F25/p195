import { HashRouter, Route, Routes } from 'react-router'
import Home from './components/content/Home'
import AboutMe from './components/content/AboutMe'
import FoodieLayout from './components/structural/FoodieLayout'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'
import Recipe from './components/content/Recipe'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<FoodieLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/about" element={<AboutMe/>}></Route>
        <Route path="/recipe" element={<Recipe/>}></Route>
      </Route>
    </Routes>
  </HashRouter>
}

export default App
