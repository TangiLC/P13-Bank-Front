import { useSelector } from "react-redux";

function Userinfo({ firstName, lastName }) {
	const language = useSelector((state) => state.language);
	const welcomeBack = {
		en: "Welcome back",
		fr: "Heureux de vous revoir",
		es: "bienvenido de nuevo",
	};
	return (
		<h1>
			{welcomeBack[language]}
			<br />
			{firstName} {lastName} !
		</h1>
	);
}

export default Userinfo;
