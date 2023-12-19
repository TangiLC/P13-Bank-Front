import { actions } from "../Slice/token";
import { selectUser } from "../../utils/selector";

export function fetchToken(userLogin) {
	return async (dispatch, getState) => {
		const status = selectUser(getState()).statusToken;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.tokenFetching(userLogin));

		const Bearer_Token = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userLogin),
		};

		try {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/login",
				Bearer_Token
			);

			if (response.status === 400) {
				alert("invalid fields");
			}
			if (response.status === 401) {
				dispatch(actions.reset());
			}

			const data = await response.json();
			dispatch(actions.tokenResolved(userLogin, data.body.token));
			return data.body.token;
		} catch (error) {
			dispatch(actions.tokenRejected(userLogin, error));
		}
	};
}
