import { 
    LOGIN_CHECK,
    LOGIN_SUCCESSFUL,
    OTP_VERIFY,
    OTP_VERIFICATION_SUCCESSFUL,
    TELEGRAM_USER_VERIFY,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_PAGE_CLOSED
} from "./actionTypes";

export const checkLogin = (email,password,history,errorState)=>({
    type: LOGIN_CHECK,
    payload: {email,password,history,errorState}
});
export const verifyOtp = (value,history)=>({
    type: OTP_VERIFY,
    payload: {value,history}
});
export const successfullLogin = () =>({
    type: LOGIN_SUCCESSFUL
})
export const otpVerificationSuccessfull = () =>({
    type: OTP_VERIFICATION_SUCCESSFUL
})
export const verifyUser = (status,errorCon) =>({
    type: TELEGRAM_USER_VERIFY,
    payload: {status,errorCon}
});
export const requestForgotPassword = (email) => ({
    type: FORGOT_PASSWORD_REQUEST,
    payload: {email}
});
export const forgotPageClosed = () =>({
    type: FORGOT_PASSWORD_PAGE_CLOSED
})