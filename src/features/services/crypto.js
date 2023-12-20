import { key } from "./key";

export function decrypt(string) {
	const CryptoJS = require("crypto-js");
	const bytes = CryptoJS.AES.decrypt(string, key);
	return bytes.toString(CryptoJS.enc.Utf8);
}

export function encrypt(string) {
	const CryptoJS = require("crypto-js");
	return CryptoJS.AES.encrypt(string, key).toString();
}
