import { put, all, takeEvery,fork} from 'redux-saga/effects';
import {LOGIN_CHECK,LOGIN_SUCCESSFUL} from "./actionTypes";

function* checklogin({payload:{email,password,history}}){
    console.log("saga login ",history)
    yield put({type: LOGIN_SUCCESSFUL});
    yield history.push("/odc")
}

function* watchLogin(){
    yield takeEvery(LOGIN_CHECK,checklogin)
}

function* sagaLogin() {
    yield all([
        fork(watchLogin)
    ]);
}
export default sagaLogin