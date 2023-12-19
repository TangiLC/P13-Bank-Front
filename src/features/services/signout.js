import {actions} from '../Slice/user'


export function signOut(){
    
    return (dispatch, getState) => {

        localStorage.clear();
        sessionStorage.clear();
        dispatch(actions.reset())
    } 
}