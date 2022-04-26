import {GET_USER_DATA,GET_USER_DATA_SUCCESSFUL} from './actionTypes'
import { HYDRATE } from 'next-redux-wrapper';
const INIT_STATE = {
    loading:{
        getUser:false
    },
    userData:[]
}

const user = (state=INIT_STATE,action) => {
    switch (action.type) {
        case HYDRATE:
            console.log("HYDRATE LOGIN",action.payload)
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
                }
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
    
        default:
            return state;
    }
}

export default user;