import { actions } from "../Slice/user";
import { selectUser } from "../../utils/selector";

export function fetchUser(token) {
	//Fetch infos profile from user
	return async (dispatch, getState) => {
		const status = selectUser(getState()).statusData;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.userFetching(token));

		const Bearer_Token = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				Bearer_Token
			);

			const data = await response.json();
			if (response.status === 400) {
				console.log("invalid fields");
			}
			if (response.status === 401) {
				dispatch(actions.reset());
			}

			dispatch(actions.userResolved(token, data.body));
		} catch (error) {
			dispatch(actions.userRejected(token, error));
		}
	};
}

export function updateUserData(token, firstName, lastName) {
	return async (dispatch) => {
		let bodyToUpdate = { firstName: firstName, lastName: lastName };
		const Bearer_Token = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bodyToUpdate),
		};
		try {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				Bearer_Token
			);

			const data = await response.json();
			dispatch(actions.userUpdate(token, firstName, lastName));
		} catch (error) {
			dispatch(actions.userRejected(token, error));
		}
	};
}
