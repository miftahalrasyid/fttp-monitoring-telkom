import { GET_SPLITTER_DATA,
  GET_CORE_FEEDER, 
  UPDATE_CORE_FEEDER,
  GET_ODCs, 
  GET_SPLITTER_DATA_SUCCESSFUL,
  GET_CORE_FEEDER_INFO_SUCCESSFUL,
  GET_ODCs_SUCCESSFUL,
  GET_SELECTED_CORE_FEEDER,
  GET_ODC_SPLITPANEL_STATUS,
  GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL
} from "./actionTypes";
import { HYDRATE } from 'next-redux-wrapper';
const INIT_STATE = {
    loading:{
        get: false,
        getOdc:false,
        update:false,
        getSplitter:false,
        getOdcSplitpanelStatus:false,
    },
    coreFeederData:"",
    odcsBox:[],
    splitterData:"",
    selectedOdcSplitpanelStatus:{},
    client: {
      coreFeederData:'',
      odcsBoxClient:'',
      selectedCoreFeeder:'',
    }
}

const odcs = (state=INIT_STATE,action) => {
  switch (action.type) {
    case HYDRATE:
        console.log("HYDRATE LOGIN",action.payload)
        return {
            ...state,
            ...action.payload,
            // token: action.payload.Login.token
            // state:{
            //     ...state,
            //     Login:{
            //         ...state.Login,
            //         token: action.payload
            //     }
            // }
        }
      case GET_ODCs:
          
        return {
            ...state,
            loading:{
                ...state.loading,
                getOdc: true
            }
        };
      case GET_SPLITTER_DATA:
          
        return {
            ...state,
            loading:{
                ...state.loading,
                getSplitter: true
            }
        };
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
      case GET_SPLITTER_DATA_SUCCESSFUL:
          // console.log("reducer",action.payload)
        return {
            ...state,
            splitterData: action.payload,
            loading:{
              ...state.loading,
              getSplitter: false
          }
        };
      case GET_CORE_FEEDER_INFO_SUCCESSFUL:
          // console.log("reducer",action.payload)
        return {
            ...state,
            coreFeederData: action.payload,
            client:{
              coreFeederData: action.payload
            },
            loading:{
              ...state.loading,
              get: false
          }
        };
      case GET_ODCs_SUCCESSFUL:
          // console.log("reducer",action.payload)
        return {
            ...state,
            odcsBox: action.payload,
            loading:{
              ...state.loading,
              getOdc: false
          }
        };
      case GET_SELECTED_CORE_FEEDER:

        return {
          ...state,
          client:{
            ...state.client,
            selectedCoreFeeder: action.payload
          }
        }

      case GET_ODC_SPLITPANEL_STATUS:

        return{
          ...state,
          loading:{
            ...state.loading,
            getOdcSplitpanelStatus: true
          }
        }
        
        case GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getOdcSplitpanelStatus: false
          },
          selectedOdcSplitpanelStatus: action.payload

        }
  
      default:
          return state;
  }
}

export default odcs;
