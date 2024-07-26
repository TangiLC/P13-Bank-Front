import { useSelector } from "react-redux";
import { selectLanguage } from "../../utils/selector";
import { hero } from "./hero";

function HomeBanner() {
	const language = useSelector(selectLanguage);
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

export default HomeBanner;
