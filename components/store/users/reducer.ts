import {
    GET_USER_DATA,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_SUCCESSFUL,
    ADD_USER_DATA,
    ADD_USER_DATA_SUCCESSFUL,
    ADD_USER_DATA_FAILED,
    DELETE_USER_DATA,
    DELETE_USER_DATA_SUCCESSFUL,
    DELETE_USER_DATA_FAILED,
    SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL
} from './actionTypes'
import { HYDRATE } from 'next-redux-wrapper';
const INIT_STATE = {
    loading:{
        getUser:false,
        addUser:false,
        deleteUser:false
    },
    userData:"",
    tableRowsPerPage:0,
    add_user:"",
    delete_user:""
}

const user = (state=INIT_STATE,action) => {
    switch (action.type) {
        case HYDRATE:
            // console.log("HYDRATE LOGIN",action.payload)
            return {
                ...state,
                ...action.payload
            }
        case GET_USER_DATA:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    getUser:true
                },
            };
        case GET_USER_DATA_SUCCESSFUL:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    getUser:false
                },
                userData: action.payload
            };
        case GET_USER_DATA_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    getUser:false
                },
                userData: action.payload
            };
        case ADD_USER_DATA:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addUser:true
                }
            };
        case ADD_USER_DATA_SUCCESSFUL:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addUser:false
                },
                add_user: action.payload
            };
        case ADD_USER_DATA_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addUser:false
                },
                add_user: action.payload
            };
        case DELETE_USER_DATA:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    deleteUser:true
                }
            };
        case DELETE_USER_DATA_SUCCESSFUL:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    deleteUser:false
                },
                delete_user: action.payload
            };
        case DELETE_USER_DATA_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    deleteUser:false
                },
                delete_user: action.payload
            };
        case SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL:
            return{
                ...state,
                tableRowsPerPage: action.payload
            }
    
        default:
            return state;
    }
}

export default user;