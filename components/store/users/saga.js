

import {put,takeEvery,all,fork} from 'redux-saga/effects';
import {GET_USER_DATA,GET_USER_DATA_SUCCESSFUL} from './actionTypes'

function* getUserDatas(){
    try {
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/user.json").then(res=>res.json());
        // console.log("filtered", res, filtered[0],odcId)
        yield put({type:GET_USER_DATA_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("error",error)
    }
}

function* watchUserData(){
    yield takeEvery(GET_USER_DATA,getUserDatas)
}

function* userSaga() {
    yield all([
        fork(watchUserData)
    ])
}
export default userSaga;