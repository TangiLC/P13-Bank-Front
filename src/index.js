import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/header/header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/footer/footer";
import Signin from "./pages/Sign-in";
import User from "./pages/User";
import { Provider } from "react-redux";
import store from "./utils/store";
import PrivateRoutes from "./utils/PrivateRoutes";

import "./styles/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Signin />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/User" element={<User />} />
					</Route>
				</Routes>
				<Footer />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>
);
