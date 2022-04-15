

import {put,takeEvery,all,fork} from 'redux-saga/effects';
import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESSFUL,
    GET_USER_DATA_FAILED,
    ADD_USER_DATA,
    ADD_USER_DATA_SUCCESSFUL,
    ADD_USER_DATA_FAILED
} from './actionTypes'

function* getUserData({payload:{page,rowsPerPage,sortOrder,token}}){
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
        const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/get-users?&limit=${rowsPerPage}&offset=${page!==0?page:1}`,requestOptions).then(res=>res.json()).then(result => {
            if(!result.success){
                if(result.msg=='Method must be one of: OPTIONS')
                    return put({type:GET_USER_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal mengambil API"}})
                else
                    return put({type:GET_USER_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
            }
            else {
                return {success:result.success,data:result.data,count:result.data.length,sortOrder,page}
            }
        });
        if(res.success)
        yield put({type:GET_USER_DATA_SUCCESSFUL,payload:res})
        else{
            yield res
        }
    } catch (error) {
        return put({type:GET_USER_DATA_FAILED,payload:{success:false,data:[],msg:error}})
    }
}

function* addUserData({payload:{email,password,role,token,setSubmitting,errorState}}){
    // console.log("data submit",email,password,role)
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("role", role);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/add-user`,requestOptions)
        .then(res=>res.json())
        .then(result=>{
            console.log("error sgga",result)
            if(!result.success){
                errorState({status:true,msg: result.msg});
                setSubmitting(false);
                // if(result.msg=='Method must be one of: OPTIONS')
                //     return put({type:ADD_USER_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal mengambil API"}})
                // else
                //     return put({type:ADD_USER_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
            }
            else {
                return {success:result.success,data:result.data,count:result.data.length,sortOrder,page}
            }
        });        
        if(res.success){
            setSubmitting(false)
            yield put({type:ADD_USER_DATA_SUCCESSFUL,payload:res})
        }
        else{
            yield res
        }
    } catch (error) {
        
    }
}

function* watchUserData(){
    yield takeEvery(GET_USER_DATA,getUserData);
    yield takeEvery(ADD_USER_DATA,addUserData);
}

function* userSaga() {
    yield all([
        fork(watchUserData)
    ])
}
export default userSaga;