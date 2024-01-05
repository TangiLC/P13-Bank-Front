import { useSelector } from "react-redux";
import { selectLanguage } from "../../utils/selector";
import { features } from "./features";
import "../../styles/style.css";

function HomeContent() {
	const language = useSelector(selectLanguage);

	return (
		<section className="features">
			<h2 className="sr-only">Features</h2>

			{features.map((feature, index) => (
				<div className="feature-item" key={index}>
					<img
						src={feature[language].icon}
						alt={feature[language].alt}
						className="feature-icon"
					/>
					<h3 className="feature-item-title">{feature[language].title}</h3>
					<p>{feature[language].content}</p>
				</div>
			))}
		</section>
	);
}
export default HomeContent;


