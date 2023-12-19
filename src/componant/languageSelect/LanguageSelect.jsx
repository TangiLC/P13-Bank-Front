import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../utils/selector";
import { setLanguage } from "../../features/Slice/language";
import "./languageSelect.css";

const LanguageSelect = () => {
	const dispatch = useDispatch();
	const language = useSelector(selectLanguage);
	const [isOpen, setIsOpen] = useState(false);

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
