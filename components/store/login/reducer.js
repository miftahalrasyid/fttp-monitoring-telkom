import {LOGIN_CHECK,LOGIN_SUCCESSFUL} from "./actionTypes";
const INIT_STATE = {
    loading: false
}
const login = (state=INIT_STATE,action)=>{
    switch (action.type) {
        case LOGIN_CHECK:
            
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESSFUL:

            return {
                ...state,
                loading:false
            }
    
        default:
            return state;
    }
}
export default login;