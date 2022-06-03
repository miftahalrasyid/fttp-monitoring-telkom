import {
    LOGIN_CHECK,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    OTP_VERIFY,
    OTP_VERIFICATION_SUCCESSFUL,
    OTP_VERIFICATION_FAILED,
    TELEGRAM_USER_VERIFY, 
    TELEGRAM_USER_VERIFY_SUCCESSFUL,
    TELEGRAM_USER_VERIFY_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUEST_SUCCESSFUL,
    FORGOT_PASSWORD_PAGE_CLOSED,
    VERIFY_RESET_CODE,
    VERIFY_RESET_CODE_SUCCESSFUL,
    VERIFY_RESET_CODE_FAILED
} from "./actionTypes";
const INIT_STATE = {
    loading: {
        login: false,
        otp:false,
        verifyUser: true,
        forgotPassword: false,
        verifyResetCode: false,
    },
    isCodeVerify:"",
    telegramToken:"",
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
            console.log("reducer telegram verify fail",action.payload)
            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyUser: false,
                },
                telegramToken: action.payload!=="" && action.payload,
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
        case OTP_VERIFICATION_FAILED:

            return {
                ...state,
                loading:{
                    ...state.loading,
                    otp:false,
                },
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
            console.log("forgot page closed")
            return {
                ...state,
                loading:{
                    ...state.loading,
                    forgotPassword: false
                },
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
        case VERIFY_RESET_CODE:
            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyResetCode: true
                },
            }
        case VERIFY_RESET_CODE_SUCCESSFUL:
            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyResetCode: false
                },
                isCodeVerify: true
            }
        case VERIFY_RESET_CODE_FAILED:
            return {
                ...state,
                loading:{
                    ...state.loading,
                    verifyResetCode: false
                },
                isCodeVerify: false
            }
        default:
            return state;
    }
}
export default auth;