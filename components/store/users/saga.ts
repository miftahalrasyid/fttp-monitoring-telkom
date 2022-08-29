

import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
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
    UPDATE_USER_DATA_FAILED,
    SET_ROWS_PER_PAGE,
    SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL
} from './actionTypes';
import { GetUserData, IaddUserData, IdeleteUserData, IgetUserData, IsetTableRowsPerPage, IupdateUserData } from './types';

/**
 * 
 * @param {requestOptions} getUserDataCall 
 * @returns 
 */
const getUserDataCall = (data: GetUserData, requestOptions) => fetch(`${(typeof window !== 'undefined') ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/get-users?sorting=${data.sortBy || ""}&direction=${data.sortOrder || ""}&limit=${data.rowsPerPage}&offset=${data.page !== 0 ? data.page : 1}&email=${data.email || ""}&filter_role=${((data?.filter && data.filter.length > 0) || "") ? (data.filter[2][0] == 'Admin' ? 1 : data.filter[2][0] == 'User' ? 2 : "") : ""}&filter_status=${((data?.filter && data.filter.length > 0) || "") ? (data.filter[3][0] == 'Active' ? 'true' : data.filter[3][0] == 'Suspend' ? 'false' : false) || "" : ""}`, requestOptions).then(res => res.json())
/**
 * 
 * @param {requestOptions} addUserDataCall 
 * @returns 
 */
const addUserDataCall = (requestOptions) => fetch(`${(typeof window !== 'undefined') ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/add-user`, requestOptions).then(res => res.json())
/**
 * 
 * @param {requestOptions} deleteUserDataCall 
 * @returns 
 */
const deleteUserDataCall = (user_id, requestOptions) => fetch(`${(typeof window !== 'undefined') ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/delete-user/${user_id}`, requestOptions).then(res => res.json())
/**
 * 
 * @param {requestOptions} deleteUserDataCall 
 * @returns 
 */
const updateUserDataCall = (user_id, requestOptions) => fetch(`${(typeof window !== 'undefined') ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/update-user/${user_id}`, requestOptions).then(res => res.json())

function* getUserData(props) {
    const { payload: { data, token, errorState, toast } }: IgetUserData = props;
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
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
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
        // console.log("get user params",data)
        const res = yield getUserDataCall(data, requestOptions).then(result => {
            if (!result.success) {
                if (result.msg == 'Method must be one of: OPTIONS')
                    return put({ type: GET_USER_DATA_FAILED, payload: { success: false, data: [], msg: "Gagal memanggil API" } })
                else
                    return put({ type: GET_USER_DATA_FAILED, payload: { success: result.success, data: [], msg: result.msg || result.message } })
            }
            else {
                return { success: result.success, data: result.data, count: result.total_rows, sortOrder: data.sortOrder, page: data.page - 1 }
            }
        });
        // console.log("get user data",res)
        if (res.success)
            yield put({ type: GET_USER_DATA_SUCCESSFUL, payload: res })
        else {
            yield res
        }
    } catch (error) {
        // console.log("error saga fetch user", error, toast)
        yield toast.error("terjadi kesalahan server", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return put({ type: GET_USER_DATA_FAILED, payload: { success: false, data: [], msg: error } })
    }
}

function* addUserData({ payload: { email, password, role, token, rowsPerPage, setSubmitting, handleAddUserClose, toast } }: IaddUserData) {
    // console.log("data submit",email,password,role)
    try {
        if (!navigator.onLine) {
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
        const res = yield addUserDataCall(requestOptions)
            // const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/add-user`,requestOptions)
            // .then(res=>res.json())
            .then(result => {
                // console.log("error sgga",result)
                if (!result.success) {
                    setSubmitting(false);
                    if (result.msg == 'Method must be one of: OPTIONS') {
                        toast.error("Gagal memanggil API", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        return put({ type: ADD_USER_DATA_FAILED, payload: { success: false, data: [], msg: "Gagal memanggil API" } })
                    }
                    else {
                        toast.error(result.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        return put({ type: ADD_USER_DATA_FAILED, payload: { success: result.success, data: [], msg: result.msg || result.message } })

                    }
                }
                else {
                    return { success: result.success, data: result.data }
                }
            });
        if (res.success) {
            // console.log("success added");
            setSubmitting(false);
            handleAddUserClose();
            toast.success(res.data.email + " berhasil ditambahkan", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield call(getUserData, ({ payload: { data: { page: 0, rowsPerPage, sortBy: null, sortOrder: null }, token, errorState: "", toast } }));
            // yield put({type:GET_USER_DATA,payload:{page:0,rowsPerPage:10,sortOrder:{name:"",direction:"asc"},token,errorState:""}})
        }
        else {
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

function* deleteUserData({ payload: { email, user_id, token, page, rowsPerPage, sort, setSubmitting, deleteRowHandleClose, toast } }: IdeleteUserData) {
    // console.log("data submit",email,password,role)
    try {
        if (!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const res = yield deleteUserDataCall(user_id, requestOptions)
            // .then(res=>res.json())
            .then(result => {
                // console.log("error sgga",result)
                if (!result.success) {
                    setSubmitting(false)
                    if (result.msg == 'Method must be one of: OPTIONS') {
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
                        return put({ type: DELETE_USER_DATA_FAILED, payload: { success: false, data: [], msg: "Gagal memanggil API" } })
                    }
                    else {
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
                        return put({ type: DELETE_USER_DATA_FAILED, payload: { success: result.success, data: [], msg: result.msg || result.message } })
                    }
                }
                else {
                    return { success: result.success, data: result.data }
                }
            });
        if (res.success) {
            deleteRowHandleClose()
            setSubmitting(false)
            toast.success(email + " berhasil di delete", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield call(getUserData, ({ payload: { data: { page, rowsPerPage, sortBy: sort.sortBy, sortOrder: sort.sortOrder }, token, errorState: "", toast } }));
            //   yield put({type:GET_USER_DATA,payload:{page:0,rowsPerPage:10,sortOrder:{name:"",direction:"asc"},token,errorState:""}})
        }
        else {
            yield res
        }
    } catch (error) {
        // console.log("delete error",error)
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
    payload: {
        email,
        password,
        role,
        status,
        user_id,
        token,
        page,
        rowsPerPage,
        sort,
        setSubmitting,
        handleClose,
        toast
    } }: IupdateUserData) {
    try {
        /** jika offline */
        if (!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer " + token);
        // console.log("if password kosong",!password || false)
        var formdata = new FormData();
        formdata.append("email", email);
        if (password)
            formdata.append("password", password);
        formdata.append("role", role);
        formdata.append("status", status);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const res = yield updateUserDataCall(user_id, requestOptions)
            // const res = yield fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/update-user/${user_id}`,requestOptions)
            // .then(res=>res.json())
            .then(result => {
                // console.log("error sgga",result)
                if (!result.success) {
                    setSubmitting(false)
                    if (result.msg == 'Method must be one of: OPTIONS') {
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
                        return put({ type: DELETE_USER_DATA_FAILED, payload: { success: false, data: [], msg: "Gagal memanggil API" } })
                    }
                    else {
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
                        return put({ type: DELETE_USER_DATA_FAILED, payload: { success: result.success, data: [], msg: result.msg || result.message } })
                    }
                }
                else {
                    return { success: result.success, data: result.data }
                }
            });
        if (res.success) {
            handleClose()
            setSubmitting(false)
            toast.success("user berhasil di update", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield call(getUserData, ({ payload: { data: { page, rowsPerPage, sortBy: sort.sortBy, sortOrder: sort.sortOrder }, token, errorState: "", toast } }));
            //   yield put({type:GET_USER_DATA,payload:{page:0,rowsPerPage:10,sortOrder:{name:"",direction:"asc"},token,errorState:""}})
        }
        else {
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

function* setTableRowsPerPage({ payload: { value } }: IsetTableRowsPerPage) {
    try {
        yield put({ type: SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL, payload: value })
    } catch (error) {
        console.log(error)
    }
}

function* watchUserData() {
    yield takeEvery(GET_USER_DATA, getUserData);
    yield takeEvery(ADD_USER_DATA, addUserData);
    yield takeEvery(SET_ROWS_PER_PAGE, setTableRowsPerPage)
    yield takeEvery(DELETE_USER_DATA, deleteUserData);
    yield takeEvery(UPDATE_USER_DATA, updateUserData);
}

function* userSaga() {
    yield all([
        fork(watchUserData)
    ])
}
export default userSaga;