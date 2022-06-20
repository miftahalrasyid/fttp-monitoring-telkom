import { 
    LOGIN_CHECK,
    LOGIN_SUCCESSFUL,
    OTP_VERIFY,
    OTP_VERIFICATION_SUCCESSFUL,
    TELEGRAM_USER_VERIFY,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_PAGE_CLOSED,
    VERIFY_RESET_CODE,
    RESET_PASSWORD
} from "./actionTypes";

export const checkLogin = (email:string,password:string,history:any,errorState:any,setSubmitting:any)=>({
    type: LOGIN_CHECK,
    payload: {email,password,history,errorState,setSubmitting}
});
export const verifyOtp = (value:string,history:any,setError:any)=>({
    type: OTP_VERIFY,
    payload: {value,history,setError}
});
export const successfullLogin = () =>({
    type: LOGIN_SUCCESSFUL
})
export const otpVerificationSuccessfull = () =>({
    type: OTP_VERIFICATION_SUCCESSFUL
})
export const verifyUser = (status:boolean,errorCon?:any) =>({
    type: TELEGRAM_USER_VERIFY,
    payload: {status,errorCon}
});
export const requestForgotPassword = (email:string) => ({
    type: FORGOT_PASSWORD_REQUEST,
    payload: {email}
});
export const forgotPageClosed = () =>({
    type: FORGOT_PASSWORD_PAGE_CLOSED
});
export const verifyResetCode = (code:string | string[]) => ({
    type: VERIFY_RESET_CODE,
    payload: {code}
});
export const resetPassword = (code:string,password:string,setError:any,setSubmitting:any) => ({
    type: RESET_PASSWORD,
    payload: {code,password,setError,setSubmitting}
});