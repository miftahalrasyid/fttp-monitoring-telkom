import {GET_USER_DATA} from './actionTypes'
export const getUserData = (page,rowsPerPage,sortOrder,token,toast) =>({
    type:GET_USER_DATA,
    payload: {page,rowsPerPage,sortOrder,token,toast}
});