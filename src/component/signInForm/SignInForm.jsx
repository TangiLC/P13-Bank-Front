import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/services/user";
import { fetchToken } from "../../features/services/token";
import { useNavigate } from "react-router-dom";
import { setRemember } from "../../features/services/remember";
import { selectLanguage } from "../../utils/selector";
import { signInText } from "./signInText";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { decrypt } from "../../features/services/crypto";

import "../../styles/style.css";

function SignInForm() {
	const language = useSelector(selectLanguage);
	const [invalid, setInvalid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const localStorageCheck =
		localStorage.getItem("AB-check") === "true" || false;
	const [isChecked, setIsChecked] = useState(localStorageCheck || false);

	const [decryptedEmail, setDecryptedEmail] = useState("");
	const [decryptedPassword, setDecryptedPassword] = useState("");
	const cryptedEmail = localStorage.getItem("AB-email");
	const cryptedPassword = localStorage.getItem("AB-password");

	useEffect(() => {
		if (isChecked) {
			setDecryptedEmail(decrypt(cryptedEmail));
			setEmail(decryptedEmail);
		}
	}, [cryptedEmail, decryptedEmail, isChecked]);

	useEffect(() => {
		if (isChecked) {
			setDecryptedPassword(decrypt(cryptedPassword));
			setPassword(decryptedPassword);
		}
	}, [cryptedPassword, decryptedPassword, isChecked]);

	const [email, setEmail] = useState(decryptedEmail || "");
	const [password, setPassword] = useState(decryptedPassword || "");
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisible = () => {
		setIsVisible(!isVisible);
	};

	const Login = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const token = await dispatch(fetchToken({ email, password }));

		if (!token) {
			setInvalid(true);
			setIsLoading(false);
			navigate("/");
		}

		setInvalid(false);
		dispatch(fetchUser(token));
		isChecked
			? setRemember({
					email: email,
					password: password,
					isChecked: isChecked,
					token: token,
			  })
			: sessionStorage.setItem("AB-token-info", token);

		navigate("/User");
	};

	return isLoading ? (
		<></>
	) : (
		<section className="sign-in-content">
			<FaUserCircle size={25} />
			<h1>{signInText[language].signIn}</h1>
			<form>
				<div>
					<div className="input-wrapper">
						<label htmlFor="username">{signInText[language].userName}</label>
						<input
							type="text"
							id="username"
							value={email || ""}
							onChange={(user) => setEmail(user.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">{signInText[language].password}</label>
						<input
							type={isVisible ? "text" : "password"}
							id="password"
							value={password || ""}
							onChange={(user) => setPassword(user.target.value)}
						/>
						<span className="password-eye" onClick={toggleVisible}>
							{isVisible ? <FaEye /> : <FaEyeSlash />}
						</span>
					</div>
					<div className="input-remember">
						<input
							type="checkbox"
							id="remember-me"
							checked={isChecked}
							onChange={() => setIsChecked(!isChecked)}
						/>
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
