export function setRemember(token, remember){
    localStorage.setItem('AB-token-info', token) 
    localStorage.setItem('isRemembered', remember)
}