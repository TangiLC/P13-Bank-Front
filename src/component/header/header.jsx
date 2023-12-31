import ArgentBankLogo from "../../assets/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, selectLanguage, selectUpdate } from "../../utils/selector";
import { setUpdate } from "../../features/Slice/updateUser";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../features/services/signout";
import { fetchUser } from "../../features/services/user";
import { useEffect } from "react";
import LanguageSelect from "../languageSelect/LanguageSelect";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

import "../../styles/style.css";

function Header() {
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);
	const update = useSelector(selectUpdate);

	const signInOut = {
		en: { in: "Sign In", out: "Sign Out" },
		fr: { in: "Connexion", out: "Déconnexion" },
		es: { in: "Iniciar sesión", out: "Cerrar sesión" },
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token =
		sessionStorage.getItem("AB-token-info") ||
		localStorage.getItem("AB-token-info");
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
			<div className="flex-row">
				<Link
					to={"/User"}
					className="main-nav-item"
					onClick={() => {
						dispatch(setUpdate(!update));
					}}
				>
					<FaUserCircle
						size={"1.5rem"}
						color="#42b983"
						style={{ verticalAlign: "sub" }}
					/>
					{user.data.data.firstName}&nbsp;
				</Link>

				<Link to={"/"} onClick={logout} className="main-nav-item">
					<FaSignOutAlt
						size={"1.5rem"}
						color="#42b983"
						style={{ verticalAlign: "sub" }}
					/>
					{signInOut[language].out}&nbsp;
				</Link>
				<LanguageSelect />
			</div>
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
			<div className="flex-row">
				<Link to={"/login"} className="main-nav-item">
					<FaSignInAlt
						size={"1.5rem"}
						color="#42b983"
						style={{ verticalAlign: "sub" }}
					/>
					&nbsp;{signInOut[language].in}
				</Link>
				<LanguageSelect />
			</div>
		</nav>
	);
}

export default Header;
