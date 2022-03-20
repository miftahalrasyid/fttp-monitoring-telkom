import {LOGIN_CHECK,LOGIN_SUCCESSFUL,OTP_VERIFY,OTP_VERIFICATION_SUCCESSFUL} from "./actionTypes";
const INIT_STATE = {
    loading: {
        login: false,
        otp:false
    },
    openOtpService: false
}
const login = (state=INIT_STATE,action)=>{
    switch (action.type) {
        case LOGIN_CHECK:
            
            return {
                ...state,
                loading:{
                    login: false
                }
            };
        case LOGIN_SUCCESSFUL:

            return {
                ...state,
                loading:{
                    login:false,
                },
                openOtpService: true
            }
        case OTP_VERIFY:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    otp:true,
                }
            }
        case OTP_VERIFICATION_SUCCESSFUL:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    otp:false,
                },
                openOtpService: false
            }
    
        default:
            return state;
    }
}
export default login;