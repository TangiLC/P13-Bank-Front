export function setRemember(token, remember){
    console.log('remember',token)
    localStorage.setItem('token-info', token) 
    localStorage.setItem('isRemembered', remember)
}