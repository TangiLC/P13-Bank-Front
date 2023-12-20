import { actions } from "../Slice/user";

export function signOut() {
	return (dispatch) => {
		localStorage.clear();
		sessionStorage.clear();
		dispatch(actions.reset());
	};
}
