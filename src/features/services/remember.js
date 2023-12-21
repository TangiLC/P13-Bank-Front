export function setRemember(remember) {
	localStorage.setItem("AB-token-info", remember.token);
	localStorage.setItem("AB-check", remember.isChecked);
}
