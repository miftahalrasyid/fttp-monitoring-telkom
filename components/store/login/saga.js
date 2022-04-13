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
    FORGOT_PASSWORD_REQUEST_SUCCESSFUL,
    LOGIN_FAILED
} from "./actionTypes";

// var myHeaders = new Headers();
// myHeaders.append("Cookie", "PHPSESSID=ff3rj3truemcrr1bj0r1j2fnir");
var requestOptions = {
    method: 'POST',
    // headers: myHeaders,
    
    // redirect: 'follow'
  };

function* checklogin({payload:{email,password,history,errorState}}){
    try {
        console.log("email",email,window,window.navigator.onLine)
        // console.log("password",password)
        var formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        //   for (let [key, value] of formData) {
        //         console.log(`${key}: ${value}`)
        //       }
        // if(!window.navigator.onLine)
        // yield put(verifyUser(false,true))
        let res;
        if(typeof window !== 'undefined')
        // res = yield fetch("/api/feeder-status-graph?region=&witel=&datel=&sto",requestOptions).then(res=>res.json());
        res = yield fetch(`/login`,{...requestOptions,body: formData}).then(response => response.json())
        .then(result => {
            console.log("result", result)
            if(!result.success)
            errorState({status:true,msg: result.msg});
            else
            errorState({status:false,msg: result?.msg || ""});
            // console.log(result);
            // verifyUser(res.success)
            return result
            // put(verifyUser(res.success))
        })
        else
        res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/login`, {...requestOptions,body: formData}).then(response => response.json())
        .then(result => {
            console.log("result", result)
            if(!result.success)
            errorState({status:true,msg: result.msg});
            else
            errorState({status:false,msg: result?.msg || ""});
            // console.log(result);
            // verifyUser(res.success)
            return result
            // put(verifyUser(res.success))
        })


        // console.log("user saga login ",res)
        
        // yield put(verifyUser(email))
        /** dummy */
        // yield put(verifyUser(false))
        if(res)
        yield put(verifyUser(res.success))
    } catch (error) {
        console.log("login error",error)
        // errorState(true)
    }
}

function* otpVerify({payload:{value,history}}){
    // console.log("otpVerify")


    try {
        var formData = new FormData();
        formData.append("otp",value);
        // console.log(email)
        const res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/verify-otp`, {...requestOptions,body:formData})
        .then(response => response.json())
        .catch(error => console.log('error', error));
        console.log("otp verify",res)
        if(res.success){
            console.log("go to odc",history)
            yield document.cookie = "token="+res.data.token;
            yield history.push("/odc")
        }
        else{
            // throw error msg to user
        }
    } catch (error) {
        
    }
}
function* userVerify({payload:{status,errorCon}}){
    try {

        console.log("user verify", status,errorCon)
        if(!status){
            // console.log("fail")
        // if(email!=="noone@telkom.com"){
            if(errorCon){
                console.log("login failed badly")
                yield put({type:LOGIN_FAILED})
            }
            else
            {
                yield put({type: TELEGRAM_USER_VERIFY_FAIL});

                yield put({type:LOGIN_SUCCESSFUL})
            }
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