import Logo from "../assets/carsale.png";
import User from "../assets/user.png"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate()
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div className="header">
      <div
      className="logo"
      onClick={() => navigate("/")}
      >
        <img src={Logo} style={{width: "45px", marginRight: "5px"}} alt="logo"/>
        <p style={{fontSize: 24}}>Car</p>
        <p style={{fontSize: 24, color: "#2266D3"}}>Sale</p>
      </div>
      {username?
      <div style={{display: "flex", alignItems: "center"}}>
        <p style={{fontSize: "20px", marginRight: "20px"}}>Привет, {username}</p>
        <a href="/me" className="account">
          <img src={User} style={{height: "1em", paddingTop: "30%"}} alt="account" />
        </a>
        <button
        onClick={() => {localStorage.removeItem("username"); localStorage.removeItem("password"); window.location.reload();}}
        style={{height: "2em", width: "6em", borderColor: "#2266D3"}}
        >Выйти</button>
      </div>
      :
      <div style={{display: "flex"}}>
        <button onClick={() => navigate("/login")} style={{height: "2em", borderColor: "#2266D3", marginRight: "2%"}}>Войти</button>
        <button onClick={() => navigate("/register")} style={{height: "2em", borderColor: "#2266D3"}}>Регистрация</button>
      </div>
      }
    </div>
  )
}

export default Header