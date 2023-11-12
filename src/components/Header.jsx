import Logo from "../assets/carsale.png";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()

    return (
        <div className="logo">
            <div onClick={() => navigate("/")} style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
                <img src={Logo} style={{width: "8%", marginRight: "1%"}} alt="logo"/>
                <p style={{fontSize: 24}}>Car</p>
                <p style={{fontSize: 24, color: "#2266D3"}}>Sale</p>
            </div>
            <button onClick={() => navigate("/login")} style={{height: "2em", borderColor: "#2266D3"}}>Войти</button>
        </div>
    )
}

export default Header