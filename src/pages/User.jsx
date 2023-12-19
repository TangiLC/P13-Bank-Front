import Transactions from "../componant/transactions/Transactions";
import { selectUser } from "../utils/selector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../features/service/user";
import { signOut } from "../features/signout";
import "../utils/styles/user.css";
import EditName from "../componant/editName/EditName";

function User() {
	const user = useSelector(selectUser);
	const token =
		sessionStorage.getItem("token-info") || localStorage.getItem("token-info");
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
		return null;
	}

	return user.data ? (
		<main className="main bg-dark">
			<EditName />
			<h2 className="sr-only">Accounts</h2>
			<Transactions
				account_title="Argent Bank Checking (x8349)"
				account_amount="$2,082.79"
				account_amount_description="Available Balance"
			/>
			<Transactions
				account_title="Argent Bank Savings (x6712)"
				account_amount="$10,928.42"
				account_amount_description="Available Balance"
			/>
			<Transactions
				account_title="Argent Bank Credit Card (x8349)"
				account_amount="$184.30"
				account_amount_description="Current Balance"
			/>
		</main>
	) : (
		<div>Error</div>
	);
}

export default User;
