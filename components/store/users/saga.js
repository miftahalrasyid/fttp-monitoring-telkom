

import {put,takeEvery,all,fork} from 'redux-saga/effects';
import {GET_USER_DATA,GET_USER_DATA_SUCCESSFUL,GET_USER_DATA_FAILED} from './actionTypes'

function* getUserData({payload:{page,rowsPerPage,sortOrder,token,toast}}){
    // try {
    //     const res = yield fetch("https://my-project-1550730936778.firebaseio.com/user.json").then(res=>res.json());
    //     // console.log("filtered", res, filtered[0],odcId)
    //     yield put({type:GET_USER_DATA_SUCCESSFUL,payload:res})
    // } catch (error) {
    //     console.log("error",error)
    // }
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/get-users?&limit=${rowsPerPage}&offset=${page!==0?page:1}`,requestOptions).then(res=>res.json()).then(result => {
            // console.log("result true", result.data)
            if(!result.success){
                console.log("result false", result)
                put({type:GET_USER_DATA_FAILED,payload:result.msg})
                toast.error(result.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(result.success){
                console.log("result true", result.data)
                return {success:result.success,data:result.data,count:result.data.length,sortOrder,page}
            }
        });
        if(res.success)
        yield put({type:GET_USER_DATA_SUCCESSFUL,payload:res})
        } catch (error) {
        toast.error("Maaf, ada kesalahan teknis", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

function* watchUserData(){
    yield takeEvery(GET_USER_DATA,getUserData)
}

function* userSaga() {
    yield all([
        fork(watchUserData)
    ])
}
export default userSaga;