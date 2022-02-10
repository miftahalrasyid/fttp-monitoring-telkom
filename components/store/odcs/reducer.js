import { GET_CORE_FEEDER, UPDATE_CORE_FEEDER, GET_CORE_FEEDER_INFO_SUCCESSFUL } from "./actionTypes";
import { HYDRATE } from 'next-redux-wrapper';
const INIT_STATE = {
    loading:{
        get: false,
        update:false
    },
    coreFeederData:""
}

const odcs = (state=INIT_STATE,action) => {
  switch (action.type) {
    case HYDRATE:
        console.log("HYDRATE LOGIN",action.payload)
        return {
            ...state,
            ...action.payload.ODCs,
            // token: action.payload.Login.token
            // state:{
            //     ...state,
            //     Login:{
            //         ...state.Login,
            //         token: action.payload
            //     }
            // }
        }
      case GET_CORE_FEEDER:
          
        return {
            ...state,
            loading:{
                ...state.loading,
                get: true
            }
        };
      case UPDATE_CORE_FEEDER:
          
        return {
            ...state,
            loading:{
                ...state.loading,
                update: true
            }
        };
      case GET_CORE_FEEDER_INFO_SUCCESSFUL:
          console.log("reducer",action.payload)
        return {
            ...state,
            coreFeederData: action.payload,
        };
  
      default:
          return state;
  }
}

export default odcs;
