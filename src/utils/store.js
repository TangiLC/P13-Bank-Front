import userReducer from "../features/Slice/user";
import tokenReducer from "../features/Slice/token";
import languageReducer from "../features/Slice/language";
import updateReducer from "../features/Slice/updateUser";

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
		language: languageReducer,
		update: updateReducer,
	},
	//middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
