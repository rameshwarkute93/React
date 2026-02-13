import Home from "./Home";
import logo from "./assets/expences.png";
import "./App.css"
import{BrowserRouter as Router , Routes , Route , Link , useLocation , Navigate} from 'react-router-dom';
import NavScrollExample from "./NavScrollExample";
import About from "./About";
import API from "./API";
import GPDP from "./GPDP";
import LoginPage from "./LoginPage";
import { useState } from "react";

// ProtectedRoute component
function ProtectedRoute({ isLoggedIn, children }) {
   return isLoggedIn ? children : <Navigate to="/" replace />;
 }
export default function App() {
  // ⭐ PERSIST LOGIN AFTER REFRESH
  const[isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")==="true")
  return (


    <>
      <Router>
        <NavScrollExample/>
        <Routes>
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn} ><Home/> </ProtectedRoute>}/>
          <Route path="/about" element={<ProtectedRoute isLoggedIn={isLoggedIn}><About/></ProtectedRoute>} />
          <Route path="/api" element={<ProtectedRoute isLoggedIn={isLoggedIn}><API/></ProtectedRoute>} />
          <Route path="/gpdp" element={<ProtectedRoute isLoggedIn={isLoggedIn}><GPDP/></ProtectedRoute>} />
        </Routes>
      </Router>
    </>


  )
}

