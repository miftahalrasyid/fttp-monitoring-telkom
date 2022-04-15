import { GET_SPLITTER_DATA,
  GET_CORE_FEEDER, 
  UPDATE_CORE_FEEDER,
  GET_ODCs, 
  GET_SPLITTER_DATA_SUCCESSFUL,
  GET_CORE_FEEDER_INFO_SUCCESSFUL,
  GET_ODCs_SUCCESSFUL,
  GET_SELECTED_CORE_FEEDER,
  GET_ODC_SPLITPANEL_STATUS,
  GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,
  GET_GRAPH_FEEDER,
  GET_GRAPH_FEEDER_SUCCESSFUL,
  GET_GRAPH_DISTRIBUTION,
  GET_GRAPH_DISTRIBUTION_SUCCESSFUL,
  GET_REGION_LIST,
  GET_REGION_LIST_SUCCESSFUL,
  GET_WITEL_LIST,
  GET_WITEL_LIST_SUCCESSFUL,
  GET_DATEL_LIST,
  GET_DATEL_LIST_SUCCESSFUL,
  GET_STO_LIST,
  GET_STO_LIST_SUCCESSFUL,
  GET_ODC_PAGE,
  GET_ODC_PAGE_SUCCESSFUL,
  GET_ODC_PAGE_FAILED
} from "./actionTypes";
import { HYDRATE } from 'next-redux-wrapper';
const INIT_STATE = {
    loading:{
        get: false,
        getOdc:false,
        update:false,
        getSplitter:false,
        getOdcSplitpanelStatus:false,
        getRegionList:false,
        getWitelList: false,
        getDatelList: false,
        getSTOList: false,
        getODCPage:false,
    },
    odc_page:"",
    sto_list:"",
    datel_list:"",
    region_list:"",
    witel_list:"",
    graph_feeder:"",
    graph_distribution:"",
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
      case GET_GRAPH_FEEDER:
        return {
          ...state,
          loading:{
            ...state.loading,
            graph_feeder: true,
          }
        }
      case GET_GRAPH_DISTRIBUTION:
        return {
          ...state,
          loading:{
            ...state.loading,
            graph_distribution: true,
          }
        }
      case GET_GRAPH_FEEDER_SUCCESSFUL:
        console.log("reducer graph feeder",action.payload)
        return {
          ...state,
          loading:{
            ...state.loading,
            graph_feeder: false,
          },
          graph_feeder: action.payload
        }
      case GET_GRAPH_DISTRIBUTION_SUCCESSFUL:
        console.log("reducer graph feeder",action.payload)
        return {
          ...state,
          loading:{
            ...state.loading,
            graph_distribution: false,
          },
          graph_distribution: action.payload
        }
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
  
      case GET_REGION_LIST:

        return{
          ...state,
          loading:{
            ...state.loading,
            getRegionList: true
          }
        }
        
        case GET_REGION_LIST_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getRegionList: false
          },
          region_list: action.payload

        }
      case GET_WITEL_LIST:

        return{
          ...state,
          loading:{
            ...state.loading,
            getWitelList: true
          }
        }
        
        case GET_WITEL_LIST_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getWitelList: false
          },
          witel_list: action.payload

        }
      case GET_DATEL_LIST:

        return{
          ...state,
          loading:{
            ...state.loading,
            getDatelList: true
          }
        }
        
        case GET_DATEL_LIST_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getDatelList: false
          },
          datel_list: action.payload

        }
      case GET_STO_LIST:

        return{
          ...state,
          loading:{
            ...state.loading,
            getSTOList: true
          }
        }
        
        case GET_STO_LIST_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getSTOList: false
          },
          sto_list: action.payload

        }

        case GET_ODC_PAGE:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getODCPage: true
          }
        }
        
        case GET_ODC_PAGE_SUCCESSFUL:
          console.log("odc page successful")
        return{
          ...state,
          loading:{
            ...state.loading,
            getODCPage: false
          },
          odc_page: {...action.payload,loading:state.loading.getODCPage}

        }
        case GET_ODC_PAGE_FAILED:
          console.log("odc page failed")
        return{
          ...state,
          loading:{
            ...state.loading,
            getODCPage: false
          },

        }
  
      default:
          return state;
  }
}

export default odcs;
