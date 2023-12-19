import { createSlice } from "@reduxjs/toolkit";

// Le state initial
const initialState = {
	statusData: "void",
	data: null,
	error: null,
	token: null,
};

const { actions, reducer } = createSlice({
	name: "User",
	initialState,
	reducers: {
		userFetching: {
			prepare: (token) => ({
				payload: { token },
			}),
			reducer: (draft, action) => {
				if (draft.statusData === "void") {
					draft.statusData = "pending";
					return;
				}
				if (draft.statusData === "resolved") {
					draft.statusData = "updating";
					return;
				}
				if (draft.statusData === "rejected") {
					draft.error = null;
					draft.statusData = "pending";
					return;
				}
				return;
			},
		},
		userResolved: {
			prepare: (token, data) => ({
				payload: { token, data },
			}),
			reducer: (draft, action) => {
				if (draft.statusData === "pending" || draft.statusData === "updating") {
					draft.data = action.payload;
					draft.statusData = "resolved";
					return;
				}
				return;
			},
		},
		userRejected: {
			prepare: (token, error) => ({
				payload: { token, error },
			}),
			reducer: (draft, action) => {
				if (draft.statusData === "pending" || draft.statusData === "updating") {
					draft.error = action.payload;
					draft.data = null;
					draft.statusData = "rejected";
					return;
				}
				return;
			},
		},
		reset: {
			reducer: () => initialState,
		},
		userUpdate: {
			prepare: (token, firstName, lastName) => ({
				payload: { token, firstName, lastName },
			}),
			reducer: (draft, action) => {
				draft.data.data.firstName = action.payload.firstName;
				draft.data.data.lastName = action.payload.lastName;
				return;
			},
		},
	},
});
export { actions };
export default reducer;
