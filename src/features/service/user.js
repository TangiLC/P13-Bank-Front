import { actions } from "../Slice/user";
import { selectUser } from "../../utils/selector";

export function fetchUser(token) {
	return async (dispatch, getState) => {
		const status = selectUser(getState()).statusData;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.userFetching(token));

		try {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await response.json();
			console.log(data);
			if (response.status === 400) {
				console.log("invalid fields");
			}
			if (response.status === 500) {
				console.log("internal Error 500");
			}
			if (response.status === 200) {
				dispatch(actions.userResolved(token, data.body));
			}
		} catch (error) {
			dispatch(actions.userRejected(token, error));
		}
	};
}

export function updateUserData(token, firstName, lastName) {
	return async (dispatch) => {
		let bodyToUpdate = { firstName: firstName, lastName: lastName };

		try {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(bodyToUpdate),
				}
			);
			if (response.status === 400) {
				console.log("invalid fields");
			}
			if (response.status === 500) {
				console.log("internal Error 500");
			}
			if (response.status === 200) {
				dispatch(actions.userUpdate(token, firstName, lastName));
			}
		} catch (error) {
			dispatch(actions.userRejected(token, error));
		}
	};
}
