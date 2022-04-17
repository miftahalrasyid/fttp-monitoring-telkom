import {
    GET_USER_DATA,
    ADD_USER_DATA,
    DELETE_USER_DATA,
    UPDATE_USER_DATA
} from './actionTypes'
export const getUserData = (page,rowsPerPage,sortOrder,token,errorState,toast) =>({
    type:GET_USER_DATA,
    payload: {page,rowsPerPage,sortOrder,token,errorState,toast}
});

export const addNewUser = (email,password,role,token,setSubmitting,handleAddUserClose,toast) => ({
    type: ADD_USER_DATA,
    payload: {email,password,role,token,setSubmitting,handleAddUserClose,toast}
});

export const deleteUser = (email,idx,user_id,token,setSubmitting,deleteRowHandleClose,toast)=>({
    type: DELETE_USER_DATA,
    payload: {email,idx,user_id,token,setSubmitting,deleteRowHandleClose,toast}
})
export const updateUserData = (email,password,role,status,idx,user_id,token,setSubmitting,handleClose,toast)=>({
    type: UPDATE_USER_DATA,
    payload: {email,password,role,status,idx,user_id,token,setSubmitting,handleClose,toast}
})