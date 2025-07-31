import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/shared/Navbar.jsx"
import Login from "./components/shared/login.jsx";
import Signup from "./components/shared/SignUp.jsx";
function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App