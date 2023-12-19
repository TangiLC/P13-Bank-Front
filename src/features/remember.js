export function setRemember(token, remember){
    localStorage.setItem('token-info', token) 
    localStorage.setItem('isRemembered', remember)
}