import Logo from "../assets/carsale.png";

function Header() {
    return (
        <div className="logo">
            <div style={{display: "flex", alignItems: "center"}}>
                <img src={Logo} style={{width: "8%", marginRight: "1%"}} alt="logo"/>
                <p style={{fontSize: 24}}>Car</p>
                <p style={{fontSize: 24, color: "#2266D3"}}>Sale</p>
            </div>
        </div>
    )
}

export default Header