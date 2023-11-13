import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const username = localStorage.getItem("username");

		if (username) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage("");

		const { username, password } = document.forms[0];
		const data = {"username": username.value, "password": password.value}

		await axios.post("http://127.0.0.1:8000/user/login", data)
		.then(response => {
			localStorage.setItem("username", username.value);
			localStorage.setItem("password", password.value);
			navigate("/");
		})
		.catch(error => {
			setErrorMessage(error.response.data.detail);
		});
	}

	return(
		<div>
			<Header />
			<div className="form" style={{display: "flex", flexDirection:"column", alignItems: "center", marginTop: "10%"}}>
				<form onSubmit={handleSubmit}>
					<p style={{fontSize: "24px", fontWeight: "600"}}>Вход</p>
					<div className="input-container">
						<label>Username </label>
						<input type="text" name="username" required />
					</div>
					<div className="input-container">
						<label>Password </label>
						<input type="password" name="password" required />
					</div>
					<div className="button-container">
						<input type="submit" />
					</div>
				</form>
				<div>{errorMessage}</div>
			</div>
		</div>
	)
}

export default Login