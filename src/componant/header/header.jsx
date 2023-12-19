import ArgentBankLogo from "../../assets/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, selectLanguage } from "../../utils/selector";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../features/signout";
import { fetchUser } from "../../features/service/user";
import "../../utils/styles/header.css";
import { useEffect } from "react";
import LanguageSelect from "../languageSelect/LanguageSelect";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

function Header() {
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);

	const signInOut = {
		en: { in: "Sign In", out: "Sign Out" },
		fr: { in: "Connexion", out: "Déconnexion" },
		es: { in: "Iniciar sesión", out: "Cerrar sesión" },
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token =
		sessionStorage.getItem("token-info") || localStorage.getItem("token-info");
	const Remembered = localStorage.getItem("isRemembered");

	function logout() {
		dispatch(signOut());
	}

	useEffect(() => {
		if (Remembered) {
			dispatch(fetchUser(token));
			navigate("/User");
		}
	}, [Remembered, dispatch, navigate, token]);

	return token && user.data ? (
		<nav className="main-nav">
			<Link to={"/"} className="main-nav-logo">
				<img
					className="main-nav-logo-image"
					src={ArgentBankLogo}
					alt="Argent Bank"
					title="< Back"
				/>
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				<Link to={"/User"} className="main-nav-item">
					<FaUserCircle size={"1.5rem"} color="#42b983" />
					{user.data.data.firstName}
				</Link>
				<Link to={"/"} onClick={logout} className="main-nav-item">
					<FaSignOutAlt size={"1.5rem"} color="#42b983" />
					{signInOut[language].out}
				</Link>
			</div>
			<LanguageSelect />
		</nav>
	) : (
		<nav className="main-nav">
			<Link to={"/"} className="main-nav-logo">
				<img
					className="main-nav-logo-image"
					src={ArgentBankLogo}
					alt="Argent Bank Logo"
				/>
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<Link to={"/login"} className="main-nav-item">
				<FaSignInAlt size={"1.5rem"} color="#42b983" />
				{signInOut[language].in}
			</Link>
			<LanguageSelect />
		</nav>
	);
}

export default Header;
