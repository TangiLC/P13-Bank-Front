import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/service/user";
import { fetchToken } from "../../features/service/token";
import { useNavigate } from "react-router-dom";
import { setRemember } from "../../features/remember";
import { selectLanguage } from "../../utils/selector";

function SignInForm() {
	const language = useSelector(selectLanguage);
	const formText = {
		en: {
			signIn: "Sign In",
			userName: "User Name",
			password: "Password",
			remember: "Remember me",
			errorMssg: "Invalid User/password couple",
		},
		fr: {
			signIn: "Connexion",
			userName: "Nom utilisateur",
			password: "Mot de passe",
			remember: "Se souvenir de moi",
			errorMssg: "Couple utilisateur/mot de passe invalide",
		},
		es: {
			signIn: "Iniciar sesión",
			userName: "Nombre de usuario",
			password: "Contraseña",
			remember: "Recordarme",
			errorMssg: "Usuario/contraseña no válidos",
		},
	};
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [invalid, setInvalid] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function Login(e) {
		e.preventDefault();
		const remember = document.getElementById("remember-me").checked;
		const userLogin = { email, password };
		const token = await dispatch(fetchToken(userLogin));

		if (!token) {
			setInvalid(true);
			navigate("/");
		}
		setInvalid(false);
		dispatch(fetchUser(token));

		remember
			? setRemember(token, remember)
			: sessionStorage.setItem("token-info", token);
		navigate("/User");
	}

	return (
		<section className="sign-in-content">
			<i className="fa fa-user-circle sign-in-icon"></i>
			<h1>{formText[language].signIn}</h1>
			<form>
				<div>
					<div className="input-wrapper">
						<label htmlFor="username">{formText[language].userName}</label>
						<input
							type="text"
							id="username"
							onChange={(user) => setEmail(user.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">{formText[language].password}</label>
						<input
							type="password"
							id="password"
							onChange={(user) => setPassword(user.target.value)}
						/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">{formText[language].remember}</label>
					</div>
					<button onClick={(e) => Login(e)} className="sign-in-button">
						{formText[language].signIn}
					</button>
				</div>
			</form>
			{invalid ? (
				<div className="messageConnexionError">
					{formText[language].errorMssg}
				</div>
			) : null}
		</section>
	);
}

export default SignInForm;
