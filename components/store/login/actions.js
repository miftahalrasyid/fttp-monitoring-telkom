import { LOGIN_CHECK } from "./actionTypes";

export const checkLogin = (email,password,history)=>({
    type: LOGIN_CHECK,
    payload: {email,password,history}
});