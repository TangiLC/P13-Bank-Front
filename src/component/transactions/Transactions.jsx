import { useSelector } from "react-redux";

import { selectLanguage } from "../../utils/selector";

function Transactions({ title, amount, description }) {
	const language = useSelector(selectLanguage);
	const view = {
		en: "View transactions",
		fr: "Voir les transactions",
		es: "Ver transacciones",
	};
	return (
		<section className="account">
			<div className="account-content-wrapper">
				<h3 className="account-title">{title}</h3>
				<p className="account-amount">{amount}</p>
				<p className="account-amount-description">{description}</p>
			</div>
			<div className="account-content-wrapper cta">
				<button className="transaction-button">{view[language]}</button>
			</div>
		</section>
	);
}

export default Transactions;
