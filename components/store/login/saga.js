import { put, all, takeEvery,fork} from 'redux-saga/effects';
import { verifyUser } from './actions';
import {
    LOGIN_CHECK,
    LOGIN_SUCCESSFUL,
    OTP_VERIFY,
    TELEGRAM_USER_VERIFY,
    TELEGRAM_USER_VERIFY_SUCCESSFUL,
    TELEGRAM_USER_VERIFY_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUEST_SUCCESSFUL
} from "./actionTypes";



function* checklogin({payload:{email,password,history}}){
    try {
        
        // console.log("saga login ",history)
        
        // yield put(verifyUser(email))
        /** dummy */
        yield put(verifyUser(email))
    } catch (error) {
        
    }
}

function* otpVerify({payload:{value,history}}){
    // console.log("otpVerify")
    try {
        yield history.push("/odc")
    } catch (error) {
        
    }
}
function* userVerify({payload:{email}}){
    try {
        console.log(email)
        if(email!=="admin@telkom.com"){
            console.log("fail")
        // if(email!=="noone@telkom.com"){
            yield put({type: TELEGRAM_USER_VERIFY_FAIL});
            yield put({type:LOGIN_SUCCESSFUL})
        }
        else{
            yield put({type: TELEGRAM_USER_VERIFY_SUCCESSFUL})
            yield put({type:LOGIN_SUCCESSFUL})
        }
    } catch (error) {
        
    }
}
function* forgotPasswordRequest({payload:{email}}){
    console.log("password requested")
    try {
        yield put({type: FORGOT_PASSWORD_REQUEST_SUCCESSFUL})
    } catch (error) {
        
    }
}

function* watchLogin(){
    yield takeEvery(LOGIN_CHECK,checklogin)
    yield takeEvery(TELEGRAM_USER_VERIFY,userVerify)
    yield takeEvery(OTP_VERIFY,otpVerify)
    yield takeEvery(FORGOT_PASSWORD_REQUEST,forgotPasswordRequest)
}

function* sagaLogin() {
    yield all([
        fork(watchLogin)
    ]);
}
export default sagaLogin