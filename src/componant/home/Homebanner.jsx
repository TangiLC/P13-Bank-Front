import { useSelector } from "react-redux";
import { selectLanguage } from "../../utils/selector";
import "../../utils/styles/homebanner.css";

function Homebanner() {
	const language = useSelector(selectLanguage);
	const hero = {
		en: {
			p1: "No fees.",
			p2: "No minimum deposit.",
			p3: "High interest rates.",
			t1: "Open a savings account with Argent Bank today!",
		},
		fr: {
			p1: "Pas de frais.",
			p2: "Pas de montant de dépôt minimal.",
			p3: "Taux d'intérêts élevés.",
			t1: "Ouvrez un compte épargne avec Argent Bank aujourd'hui !",
		},
		es: {
			p1: "Sin comisiones.",
			p2: "Sin depósito mínimo.",
			p3: "Altas tasas de interés.",
			t1: "¡Abre una cuenta de ahorros en Argent Bank hoy mismo!",
		},
	};
	return (
		<div className="hero">
			<section className="hero-content">
				<h2 className="sr-only">Promoted Content</h2>
				<p className="subtitle">{hero[language].p1}</p>
				<p className="subtitle">{hero[language].p2}</p>
				<p className="subtitle">{hero[language].p3}</p>
				<p className="text">{hero[language].t1}</p>
			</section>
		</div>
	);
}

export default Homebanner;
