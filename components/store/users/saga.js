

import {put,takeEvery,all,fork} from 'redux-saga/effects';
import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESSFUL,
    GET_USER_DATA_FAILED,
    ADD_USER_DATA,
    ADD_USER_DATA_SUCCESSFUL,
    ADD_USER_DATA_FAILED,
    DELETE_USER_DATA,
    DELETE_USER_DATA_SUCCESSFUL,
    DELETE_USER_DATA_FAILED,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_SUCCESSFUL,
    UPDATE_USER_DATA_FAILED
} from './actionTypes'

function* getUserData({payload:{page,rowsPerPage,sortOrder,token,errorState,toast}}){

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
        // console.log("toast",toast)
        // if(!global.navigator.onLine) {
        //     toast.error("Anda tidak koneksi dengan internet", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //       });
        // }
        console.log("get user params",page,rowsPerPage,sortOrder,token)
        const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/get-users?&limit=${rowsPerPage}&offset=${page!==0?page:1}`,requestOptions).then(res=>res.json()).then(result => {
            if(!result.success){
                if(result.msg=='Method must be one of: OPTIONS')
                    return put({type:GET_USER_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                else
                    return put({type:GET_USER_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
            }
            else {
                return {success:result.success,data:result.data,count:result.total_rows,sortOrder,page:page-1}
            }
        });
        console.log("get user data",res)
        if(res.success)
        yield put({type:GET_USER_DATA_SUCCESSFUL,payload:res})
        else{
            yield res
        }
    } catch (error) {
        // console.log("error saga fetch user",error,toast)
        yield toast.error("terjadi kesalahan server", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        return put({type:GET_USER_DATA_FAILED,payload:{success:false,data:[],msg:error}})
    }
}

function* addUserData({payload:{email,password,role,token,setSubmitting,handleAddUserClose,toast}}){
    // console.log("data submit",email,password,role)
    try {
        if(!navigator.onLine) {
            setSubmitting(false);
            toast.error("Anda tidak terhubung dengan internet", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            return; 
        }
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer "+token);

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
            // console.log("error sgga",result)
            if(!result.success){
                setSubmitting(false);
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:ADD_USER_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:ADD_USER_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})

                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            console.log("success added")
            setSubmitting(false)
            handleAddUserClose();
            toast.success(res.data.email+" berhasil ditambahkan", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            yield put({type:GET_USER_DATA,payload:{page:0,rowsPerPage:10,sortOrder:{name:"",direction:"asc"},token,errorState:""}})
        }
        else{
            yield res
        }
    } catch (error) {
        toast.error("terjadi kesalahan server", {
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

function* deleteUserData({payload:{email,idx,user_id,token,setSubmitting,deleteRowHandleClose,toast}}){
    // console.log("data submit",email,password,role)
    try {
        if(!navigator.onLine) {
            setSubmitting(false);
            toast.error("Anda tidak terhubung dengan internet", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setSubmitting(false);
            return; 
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
        const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/delete-user/${user_id}`,requestOptions)
        .then(res=>res.json())
        .then(result=>{
            // console.log("error sgga",result)
            if(!result.success){
                setSubmitting(prev=>{
                    prev[idx].status = false;
                    return {...prev}
                })
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    // errorState({status:true,msg:"Gagal memanggil API"});
                    return put({type:DELETE_USER_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    // errorState({status:true,msg: result.msg});
                    return put({type:DELETE_USER_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            deleteRowHandleClose(idx)
            setSubmitting(prev=>{
                prev[idx].status = false;
                return {...prev}
            })
            toast.success(email+" berhasil di delete", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              yield put({type:GET_USER_DATA,payload:{page:0,rowsPerPage:10,sortOrder:{name:"",direction:"asc"},token,errorState:""}})
        }
        else{
            yield res
        }
    } catch (error) {
        toast.error("terjadi kesalahan server", {
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

function* updateUserData({
    payload:{
        email,
        password,
        role,
        status,
        idx,
        user_id,
        token,
        setSubmitting,
        handleClose,
        toast
    }}){
    try {
        /** jika offline */
        if(!navigator.onLine) {
            setSubmitting(false);
            toast.error("Anda tidak terhubung dengan internet", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setSubmitting(false);
            return; 
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var formdata = new FormData();
        formdata.append("email", email);
        if(!password || false)
        formdata.append("password", password);
        formdata.append("role", role);
        formdata.append("status", status);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/update-user/${user_id}`,requestOptions)
        .then(res=>res.json())
        .then(result=>{
            // console.log("error sgga",result)
            if(!result.success){
                setSubmitting(prev=>{
                    prev[idx].status = false;
                    return {...prev}
                })
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    // errorState({status:true,msg:"Gagal memanggil API"});
                    return put({type:DELETE_USER_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    // errorState({status:true,msg: result.msg});
                    return put({type:DELETE_USER_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            handleClose(idx)
            setSubmitting(prev=>{
                prev[idx].status = false;
                return {...prev}
            })
            toast.success("user berhasil di update", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              yield put({type:GET_USER_DATA,payload:{page:0,rowsPerPage:10,sortOrder:{name:"",direction:"asc"},token,errorState:""}})
        }
        else{
            yield res
        }
    } catch (error) {
        toast.error("terjadi kesalahan server", {
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
    yield takeEvery(GET_USER_DATA,getUserData);
    yield takeEvery(ADD_USER_DATA,addUserData);
    yield takeEvery(DELETE_USER_DATA,deleteUserData);
    yield takeEvery(UPDATE_USER_DATA,updateUserData);
}

function* userSaga() {
    yield all([
        fork(watchUserData)
    ])
}
export default userSaga;