import { key } from './key';
export function setRemember(remember) {
    const CryptoJS = require('crypto-js');
    const email=CryptoJS.AES.encrypt(remember.email, key).toString();
    const password=CryptoJS.AES.encrypt(remember.password, key).toString();
    localStorage.setItem("AB-token-info", remember.token);
	localStorage.setItem("AB-check", remember.isChecked);
	localStorage.setItem("AB-email", email);
	localStorage.setItem("AB-password", password);    
}
