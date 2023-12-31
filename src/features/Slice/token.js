import { createSlice } from "@reduxjs/toolkit";

// Le state initial
const initialState = {
	statusToken: "idle", // 'idle', 'pending', 'updating', 'resolved', 'rejected'
	data: null,
	error: null,
	token: null,
};

const { actions, reducer } = createSlice({
	name: "TokenUser",
	initialState,
	reducers: {
		tokenFetching: {
			prepare: (userLogin) => ({
				payload: { userLogin },
			}),
			reducer: (draft, action) => {
				if (draft.statusToken === "idle") {
					draft.statusToken = "pending";
					return;
				}
				if (draft.statusToken === "resolved") {
					draft.statusToken = "updating";
					return;
				}
				if (draft.statusToken === "rejected") {
					draft.error = null;
					draft.statusToken = "pending";
					return;
				}
				return;
			},
		},
		tokenResolved: {
			prepare: (userLogin, data) => ({
				payload: { userLogin, data },
			}),
			reducer: (draft, action) => {
				if (
					draft.statusToken === "pending" ||
					draft.statusToken === "updating"
				) {
					draft.data = action.payload;
					draft.statusToken = "resolved";
					return;
				}
				return;
			},
		},
		tokenRejected: {
			prepare: (userLogin, error) => ({
				payload: { userLogin, error },
			}),
			reducer: (draft, action) => {
				if (
					draft.statusToken === "pending" ||
					draft.statusToken === "updating"
				) {
					draft.error = action.payload;
					draft.data = null;
					draft.statusToken = "rejected";
					return;
				}
				return;
			},
		},
		reset: {
			reducer: () => initialState,
		},
	},
});
export { actions };
export default reducer;
