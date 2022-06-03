import { put, all, takeEvery,fork} from 'redux-saga/effects';
import { verifyUser } from './actions';
import FormData from 'form-data';
import {
    LOGIN_CHECK,
    LOGIN_SUCCESSFUL,
    OTP_VERIFY,
    TELEGRAM_USER_VERIFY,
    TELEGRAM_USER_VERIFY_SUCCESSFUL,
    TELEGRAM_USER_VERIFY_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUEST_SUCCESSFUL,
    LOGIN_FAILED,
    FORGOT_PASSWORD_PAGE_CLOSED,
    OTP_VERIFICATION_SUCCESSFUL,
    OTP_VERIFICATION_FAILED,
    VERIFY_RESET_CODE,
    VERIFY_RESET_CODE_SUCCESSFUL,
    VERIFY_RESET_CODE_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESSFUL
} from "./actionTypes";

// var myHeaders = new Headers();
// myHeaders.append("Cookie", "PHPSESSID=ff3rj3truemcrr1bj0r1j2fnir");
var requestOptions = {
    method: 'POST',
    // headers: myHeaders,
    
    // redirect: 'follow'
  };

function* checklogin({payload:{email,password,history,errorState,setSubmitting}}){
    try {
        console.log("email",email,window,window.navigator.onLine,errorState)
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
        res = yield fetch(`/login`,{...requestOptions,body: formData}).then(response => response.json())
        .then( result => {
            console.log("result", result)
            if(!result.success){
                errorState({status:true,msg: result.msg,token: result?.token || ""});
                setSubmitting(false);
            }
            else
            errorState({status:false,msg: result?.msg || ""});

            return result
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

function* otpVerify({payload:{value,history,setError}}){
    
    
    try {
        console.log("otpVerify")
        var formData = new FormData();
        formData.append("otp",value);
        // console.log(email)
        let res;
        if(typeof window !== 'undefined')
        // res = yield fetch("/api/feeder-status-graph?region=&witel=&datel=&sto",requestOptions).then(res=>res.json());
        res = yield fetch(`/verify-otp`, {...requestOptions,body:formData}).then(response => response.json())
        .catch(error => console.log('error', error));
        else
        res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/verify-otp`, {...requestOptions,body:formData})
        .then(response => response.json())
        .catch(error => console.log('error', error));
        console.log("otp verify",res)
        if(res.success){
            setError("")
            // console.log("go to odc",history)
            yield document.cookie = "token="+res.data.token;
            yield history.push("/odc");
            yield put({type: OTP_VERIFICATION_SUCCESSFUL})
        }
        else{
            // console.log("isotp loading errors")
            setError(res.msg);
            yield put({type: OTP_VERIFICATION_FAILED})
        }
    } catch (error) {
        console.log("otp verify error ",error)
    }
}
function* userVerify({payload:{status,errorCon,token}}){
    try {

        // console.log("user verify", status,errorCon)
        if(!status){
            // console.log("fail")
        // if(email!=="noone@telkom.com"){
            if(errorCon){
                // console.log("login failed badly")
                yield put({type:LOGIN_FAILED})
            }
            else
            {
                console.log("verify user",token)
                if(!token)
                yield put({type: TELEGRAM_USER_VERIFY_FAIL,payload:""});
                else{
                    yield put({type: TELEGRAM_USER_VERIFY_FAIL,payload:token});

                }

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
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("email",email)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const res = yield fetch("/forgot-password",requestOptions).then(rest=>rest.json()).then(result=>{

        });
        yield put({type: FORGOT_PASSWORD_REQUEST_SUCCESSFUL})
        // if(res.success){
        // }
        // else{
        //     yield put({type: FORGOT_PASSWORD_PAGE_CLOSED})
        // }
    } catch (error) {
        
    }
}
function* verifyResetCode({payload:{code}}){
    try {
        // console.log("verifyresetcode called");
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("code", code);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
        const res = yield fetch(`${typeof window == 'undefined' ? process.env.NEXT_PUBLIC_API_HOST:""}/verify-forgot-password`,requestOptions).then(rest=>rest.json()).then(result=>{
            return result
        })
        // console.log("result",res)
        if(res.success)
        yield put({type: VERIFY_RESET_CODE_SUCCESSFUL})
        else
        yield put({type: VERIFY_RESET_CODE_FAILED})
    } catch (error) {
        console.log("error verify code",error)
    }
}
function* resetPassword({payload:{code,password,setError,setSubmitting}}){
    try {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("code", code);
        formdata.append("password", password);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const res = yield fetch("/update-password",requestOptions).then(rest=>rest.json()).then(result=>{
            if(!result.success){
                setSubmitting(false)
                setError(prev=>({...prev,msg: "terjadi kesalahan server"}))
            }
            return result
        });
        if(res.success){
            
            yield put({type: RESET_PASSWORD_SUCCESSFUL})
        }
    } catch (error) {

    }
}

function* watchLogin(){
    yield takeEvery(LOGIN_CHECK,checklogin)
    yield takeEvery(TELEGRAM_USER_VERIFY,userVerify)
    yield takeEvery(OTP_VERIFY,otpVerify)
    yield takeEvery(FORGOT_PASSWORD_REQUEST,forgotPasswordRequest)
    yield takeEvery(VERIFY_RESET_CODE,verifyResetCode)
    yield takeEvery(RESET_PASSWORD,resetPassword)
}

function* sagaAuth() {
    yield all([
        fork(watchLogin)
    ]);
}
export default sagaAuth