import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../utils/selector";
import { setLanguage } from "../../features/Slice/language";
import "../../utils/styles/languageSelect.css";

const LanguageSelect = () => {
	const dispatch = useDispatch();
	const language = useSelector(selectLanguage);
	const [isOpen, setIsOpen] = useState(false);

	const detectBrowserLanguage = () => {
		const userLanguage = navigator.language || navigator.userLanguage;
		if (["fr", "en", "es"].includes(userLanguage)) {
			dispatch(setLanguage(userLanguage));
		} else {
			dispatch(setLanguage("en"));
		}
	};
	useEffect(() => {
		detectBrowserLanguage();
		// eslint-disable-next-line
	}, []);

	const languages = [
		{ code: "fr", label: "français" },
		{ code: "en", label: "english" },
		{ code: "es", label: "español" },
	];

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const selectLang = (lang) => {
		dispatch(setLanguage(lang));
		setIsOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="nav-item flex-row">
				<div className={`flag flag-${language}`} onClick={toggleMenu} />
				{isOpen && (
					<>
						{languages.map((lang) =>
							language !== lang.code ? (
								<div
									key={lang.code}
									onClick={() => selectLang(lang.code)}
									className={`flag flag-${lang.code}`}
									alt={lang.label}
									title={lang.label}
									style={{ textTransform: "capitalize" }}
								>
									{lang.code}
								</div>
							) : null
						)}
					</>
				)}
			</div>
		</nav>
	);
};

export default LanguageSelect;
