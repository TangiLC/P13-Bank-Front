import Transactions from "../component/transactions/Transactions";
import { selectUser } from "../utils/selector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../features/services/user";
import { signOut } from "../features/services/signout";
import EditName from "../component/editName/EditName";
import { SpinnerDiamond } from "spinners-react";

import "../styles/style.css";

function User() {
	const accounts = [
		{
			title: "Argent Bank Checking (x8349)",
			amount: "$2,082.79",
			description: "Available Balance",
		},
		{
			title: "Argent Bank Savings (x6712)",
			amount: "$10,928.42",
			description: "Available Balance",
		},
		{
			title: "Argent Bank Credit Card (x8349)",
			amount: "$184.30",
			description: "Current Balance",
		},
	];

	const user = useSelector(selectUser);
	const token =
		sessionStorage.getItem("AB-token-info") ||
		localStorage.getItem("AB-token-info");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (!user.data) {
			if (token) {
				dispatch(fetchUser(token));
				navigate("/User");
			} else {
				localStorage.clear();
				sessionStorage.clear();
				dispatch(signOut());
				navigate("/login");
			}
		}
	}, [dispatch, navigate, token, user]);

	if (!user.data) {
		return (
			<main className="main bg-dark">
				<br />
				<SpinnerDiamond
					size={100}
					color={"#00bb77"}
					secondaryColor={"#035935"}
					speed={150}
					thickness={200}
				/>
			</main>
		);
	}

	return user.data ? (
		<main className="main bg-dark">
			<EditName />
			<h2 className="sr-only">Accounts</h2>
			{accounts.map((account, index) => (
				<Transactions
					key={index}
					title={account.title}
					amount={account.amount}
					description={account.description}
				/>
			))}
		</main>
	) : (
		<div>Error</div>
	);
}

export default User;
