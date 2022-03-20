import { put, all, takeEvery,fork} from 'redux-saga/effects';
import {LOGIN_CHECK,LOGIN_SUCCESSFUL,OTP_VERIFY} from "./actionTypes";


function* checklogin({payload:{email,password,history}}){
    try {
        
        // console.log("saga login ",history)
        yield put({type:LOGIN_SUCCESSFUL})
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

function* watchLogin(){
    yield takeEvery(LOGIN_CHECK,checklogin)
    yield takeEvery(OTP_VERIFY,otpVerify)
}

function* sagaLogin() {
    yield all([
        fork(watchLogin)
    ]);
}
export default sagaLogin