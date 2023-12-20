import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectLanguage, selectUpdate } from "../../utils/selector";
import { setUpdate } from "../../features/Slice/updateUser";
import { useState } from "react";
import Userinfo from "../user/Userinfo";
import { updateUserData } from "../../features/services/user";
import { editUser } from "./editUser";
import { FaUserEdit, FaRegWindowClose } from "react-icons/fa";
import "../../styles/style.css";

function EditName() {
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);
	const update = useSelector(selectUpdate);

	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	function edit(e) {
		e.preventDefault();
		const token = user.data.token || localStorage.getItem("AB-token-info");
		const edit = dispatch(updateUserData(token, firstName, lastName));

		if (!edit) {
			return;
		}
		dispatch(setUpdate(false));
	}
	return !update ? (
		<div className="header">
			<Userinfo
				firstName={user.data.data.firstName}
				lastName={user.data.data.lastName}
			/>
			<button className="edit-button" onClick={() => dispatch(setUpdate(true))}>
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
					<button className="change-button" type="submit">
						{editUser[language].save}&nbsp;&nbsp;
						<FaUserEdit size={"1.1rem"} style={{ verticalAlign: "sub" }} />
					</button>
					<button
						className="change-button"
						onClick={(e) => {
							e.preventDefault(e);
							dispatch(setUpdate(false));
						}}
					>
						<FaRegWindowClose
							size={"1.1rem"}
							style={{ verticalAlign: "sub" }}
						/>
						&nbsp;&nbsp;
						{editUser[language].cancel}
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditName;
