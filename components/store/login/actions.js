import { LOGIN_CHECK,LOGIN_SUCCESSFUL,OTP_VERIFY,OTP_VERIFICATION_SUCCESSFUL} from "./actionTypes";

export const checkLogin = (email,password,history)=>({
    type: LOGIN_CHECK,
    payload: {email,password,history}
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