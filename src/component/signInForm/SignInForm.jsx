import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/services/user";
import { fetchToken } from "../../features/services/token";
import { useNavigate } from "react-router-dom";
import { setRemember } from "../../features/services/remember";
import { selectLanguage } from "../../utils/selector";
import { signInText } from "./signInText";

function SignInForm() {
	const language = useSelector(selectLanguage);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [invalid, setInvalid] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const memory_token = localStorage.getItem("AB-token-info");
	if (memory_token) {
		setInvalid(false);
		dispatch(fetchUser(memory_token));
		navigate("/User");
	}

	async function Login(e) {
		e.preventDefault();
		const remember = document.getElementById("remember-me").checked;
		const token = await dispatch(fetchToken({ email, password }));

		if (!token) {
			setInvalid(true);
			navigate("/");
		}

		setInvalid(false);
		dispatch(fetchUser(token));

		remember
			? setRemember(token, remember)
			: sessionStorage.setItem("AB-token-info", token);
		navigate("/User");
	}

	return (
		<section className="sign-in-content">
			<i className="fa fa-user-circle sign-in-icon"></i>
			<h1>{signInText[language].signIn}</h1>
			<form>
				<div>
					<div className="input-wrapper">
						<label htmlFor="username">{signInText[language].userName}</label>
						<input
							type="text"
							id="username"
							onChange={(user) => setEmail(user.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">{signInText[language].password}</label>
						<input
							type="password"
							id="password"
							onChange={(user) => setPassword(user.target.value)}
						/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">{signInText[language].remember}</label>
					</div>
					<button onClick={(e) => Login(e)} className="sign-in-button">
						{signInText[language].signIn}
					</button>
				</div>
			</form>
			{invalid ? (
				<div className="messageConnexionError">
					{signInText[language].errorMssg}
				</div>
			) : null}
		</section>
	);
}

export default SignInForm;
