import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectLanguage } from "../../utils/selector";
import { useState } from "react";
import Userinfo from "../user/Userinfo";
import { updateUserData } from "../../features/service/user";
import "../../utils/styles/editname.css";

function EditName() {
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);

	const editUser = {
		en: {
			edit: "Edit Name",
			save: "Save",
			cancel: "Cancel",
			greeting: "Please edit your informations",
		},
		fr: {
			edit: "Modifier Nom",
			save: "Enregistrer",
			cancel: "Annuler",
			greeting: "Merci de mettre à jour vos informations",
		},
		es: {
			edit: "Editar Nombre",
			save: "Guardar",
			cancel: "Cancelar",
			greeting: "Por favor, edite sus datos",
		},
	};

	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	function edit(e) {
		e.preventDefault();
		const token = user.data.token || localStorage.getItem("token-info");
		const edit = dispatch(updateUserData(token, firstName, lastName));

		if (!edit) {
			return;
		}
		setIsUpdating(false);
	}
	return !isUpdating ? (
		<div className="header">
			<Userinfo
				firstName={user.data.data.firstName}
				lastName={user.data.data.lastName}
			/>
			<button className="edit-button" onClick={() => setIsUpdating(true)}>
				{editUser[language].edit}
			</button>
		</div>
	) : (
		<div className="header">
			<h1 className="">{editUser[language].greeting}</h1>
			<form className="formChange" onSubmit={(e) => edit(e)}>
				<div className="divInputChange">
					<input
						className="inputChange"
						type="text"
						placeholder={user.data.data.firstName}
						onChange={(user) => setFirstName(user.target.value)}
					/>
					<input
						className="inputChange"
						type="text"
						placeholder={user.data.data.lastName}
						onChange={(user) => setLastName(user.target.value)}
					/>
				</div>
				<div className="divButtonChange">
					<button className="buttonChange" type="submit">
						{editUser[language].save}
					</button>
					<button
						className="buttonChange"
						onClick={(e) => {
							e.preventDefault(e);
							setIsUpdating(false);
						}}
					>
						{editUser[language].cancel}
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditName;
