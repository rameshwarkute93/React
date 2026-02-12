import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css"
export default function LoginPage({setIsLoggedIn}){

  const navigate = useNavigate();
  const [mob , setMob] = useState("");

  let getMobile = (e)=>{
    setMob(e.target.value);
  }

  let login = ()=>{
    if(mob === "9322315429"){
      alert("Login Successfully");
      setIsLoggedIn(true)
      navigate("/home");
    }else{
      alert("Invalid Mobile Number");
    }
  }

  return(
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">

      <div className="card glass-card login-card border-0 shadow-lg p-4">

        <h3 className="gradient-text text-center fw-bold mb-4">
          Student Dashboard Login
        </h3>

        <div className="mb-3">
          <label className="form-label-modern">Mobile Number</label>

          <input
            type="number"
            className="form-control modern-input"
            onChange={getMobile}
            placeholder="Enter mobile number"
          />
        </div>

        <button className="btn-login w-100" onClick={login}>
          Login
        </button>

      </div>
    </div>
  )
}
