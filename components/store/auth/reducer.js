import {
    LOGIN_CHECK,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    OTP_VERIFY,
    OTP_VERIFICATION_SUCCESSFUL,
    TELEGRAM_USER_VERIFY, 
    TELEGRAM_USER_VERIFY_SUCCESSFUL,
    TELEGRAM_USER_VERIFY_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUEST_SUCCESSFUL,
    FORGOT_PASSWORD_PAGE_CLOSED
} from "./actionTypes";
const INIT_STATE = {
    loading: {
        login: false,
        otp:false,
        verifyUser: true,
        forgotPassword: false,
    },
    openTelegramVerify: false,
    openOtpService: false,
    openConfirmationPage:false
}
const auth = (state=INIT_STATE,action)=>{
    switch (action.type) {
        case LOGIN_CHECK:
            
            return {
                ...state,
                loading:{
                    ...state.loading,
                    login: false
                }
            };
        case LOGIN_SUCCESSFUL:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyUser: false,
                    login:false,
                },
                openOtpService: true
            }
        case LOGIN_FAILED:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyUser: true,
                    login:false,
                },
                openOtpService: false
            }
        case TELEGRAM_USER_VERIFY:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyUser: true
                }
            }
        case TELEGRAM_USER_VERIFY_FAIL:
            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyUser: false,
                },
                openTelegramVerify: true
            }
        case TELEGRAM_USER_VERIFY_SUCCESSFUL:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyUser: false,
                },
                openTelegramVerify: false
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
                    verifyUser: true,
                },
                openOtpService: false
            }
        case FORGOT_PASSWORD_REQUEST: 

            return {
                ...state,
                loading:{
                    ...state.loading,
                    forgotPassword: true
                }
            }
        case FORGOT_PASSWORD_PAGE_CLOSED:
            return {
                ...state,
                openConfirmationPage:false
            }
        case FORGOT_PASSWORD_REQUEST_SUCCESSFUL: 

            return {
                ...state,
                loading:{
                    ...state.loading,
                    forgotPassword: false
                },
                openConfirmationPage:true
            }
        default:
            return state;
    }
}
export default auth;