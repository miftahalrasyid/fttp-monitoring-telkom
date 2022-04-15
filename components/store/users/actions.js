import {
    GET_USER_DATA,
    ADD_USER_DATA
} from './actionTypes'
export const getUserData = (page,rowsPerPage,sortOrder,token,errorState) =>({
    type:GET_USER_DATA,
    payload: {page,rowsPerPage,sortOrder,token,errorState}
});

export const addNewUser = (email,password,role,token,setSubmitting,errorState) => ({
    type: ADD_USER_DATA,
    payload: {email,password,role,token,setSubmitting,errorState}
});