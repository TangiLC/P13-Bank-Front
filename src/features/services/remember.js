import { encrypt } from "./crypto";

export function setRemember(remember) {
	const email = encrypt(remember.email);
	const password = encrypt(remember.password);
	localStorage.setItem("AB-token-info", remember.token);
	localStorage.setItem("AB-check", remember.isChecked);
	localStorage.setItem("AB-email", email);
	localStorage.setItem("AB-password", password);
}
