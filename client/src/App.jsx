import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/shared/Navbar.jsx"
import Login from "./components/shared/login.jsx";
import Signup from "./components/shared/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Home from "./components/Home.jsx";
import AllJobs from "./components/AllJobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Company from "./components/Company.jsx";
import NewComapny from "./components/NewComapny.jsx";
import SingleCompany from "./components/SingleCompany.jsx";
function App() {
  const userProfile = {
  fullName: 'Alex Doe',
  bio: 'Experienced frontend developer with a passion for creating beautiful, intuitive, and functional user interfaces. Specializing in React and modern JavaScript frameworks.',
  email: 'alex.doe@email.com',
  phone: '+1 (555) 123-4567',
  skills: ['HTML5', 'CSS3', 'TailwindCSS', 'JavaScript (ES6+)', 'React', 'Next.js', 'Node.js'],
  resume: 'Alex_Doe_Resume_2024',
};
  return (
    <div className="bg-[#0D1117] min-h-screen font-sans text-gray-300">
      <BrowserRouter>
      <Provider store={store}>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/all/jobs' element={<AllJobs/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/profile' element={<Profile profile={userProfile}/>}/>
        <Route path='/description/:id' element={<JobDescription/>}/>
        <Route path='/admin/company' element={<Company/>} />
        <Route path='/create/new/Company' element={<NewComapny/>} />
        <Route path='/create/new/Company/:id' element={<SingleCompany/>} />
        </Routes>
      </Provider> 
      </BrowserRouter>
    </div>
  )
}

export default App