import iconchat from "../../assets/icon-chat.png";
import iconmoney from "../../assets/icon-money.png";
import iconsecurity from "../../assets/icon-security.png";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../utils/selector";
import "../../utils/styles/home.css";

function Home() {
	const language = useSelector(selectLanguage);
	const features = [
		{
			en: {
				icon: iconchat,
				alt: "Get in Touch",
				title: "You are our #1 priority",
				content: `Need to talk to a representative? You can get in touch 
                    through our 24/7 chat or through a phone call in less than 5 minutes.`,
			},
			fr: {
				icon: iconchat,
				alt: "Restez en contact",
				title: "Vous êtes notre priorité n°1",
				content: `Besoin de parler à un représentant ? Vous pouvez entrer en contact 
                    par notre tchat 24h/24 7j/7 ou par téléphone en moins de 5 minutes.`,
			},
			es: {
				icon: iconchat,
				alt: "Ponte en contacto",
				title: "Eres nuestra prioridad número 1",
				content: `¿Necesitas hablar con un representante? Puedes ponerte en contacto
                a través de nuestro chat 24/7 o mediante una llamada telefónica en menos de 5 minutos.`,
			},
		},
		{
			en: {
				icon: iconmoney,
				alt: "Savings",
				title: "More savings means higher rates",
				content: `The more you save with us, the higher your interest rate will be!`,
			},
			fr: {
				icon: iconmoney,
				alt: "Épargne",
				title: "Plus d'épargne signifie meilleurs taux",
				content: `Plus vous épargnez avec nous, meilleurs seront vos taux d'intérêts !`,
			},
			es: {
				icon: iconmoney,
				alt: "Ahorros",
				title: "Más ahorros significa tasas más altas",
				content: `¡Cuanto más ahorres con nosotros, mayor será tu tasa de interés!`,
			},
		},
		{
			en: {
				icon: iconsecurity,
				alt: "Security",
				title: "Security you can trust",
				content: `We use top of the line encryption to make sure
                     your data and money is	always safe.`,
			},
			fr: {
				icon: iconsecurity,
				alt: "Sécurité",
				title: "Une sécurité en qui vous pouvez avoir confiance",
				content: `Nous utilisons les systèmes de chiffrement les plus performants
                    pour garantir que vos données et votre argent soient toujours en sécurité.`,
			},
			es: {
				icon: iconsecurity,
				alt: "Seguridad",
				title: "Seguridad en la que puedes confiar",
				content: `Utilizamos cifrado de última generación para asegurarnos de que tus datos y dinero estén siempre seguros.`,
			},
		},
	];

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
export default Home;

/*<div className="feature-item">
				<img src={iconchat} alt="Chat Icon" className="feature-icon" />
				<h3 className="feature-item-title">You are our #1 priority</h3>
				<p>
					Need to talk to a representative? You can get in touch through our
					24/7 chat or through a phone call in less than 5 minutes.
				</p>
			</div>

			<div className="feature-item">
				<img src={iconmoney} alt="Money" className="feature-icon" />
				<h3 className="feature-item-title">More savings means higher rates</h3>
				<p>The more you save with us, the higher your interest rate will be!</p>
			</div>
			<div className="feature-item">
				<img src={iconsecurity} alt="Security" className="feature-icon" />
				<h3 className="feature-item-title">Security you can trust</h3>
				<p>
					We use top of the line encryption to make sure your data and money is
					always safe.
				</p>
			</div>*/
