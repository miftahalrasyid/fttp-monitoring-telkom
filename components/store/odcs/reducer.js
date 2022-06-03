import { GET_SPLITTER_DATA,
  GET_CORE_FEEDER, 
  UPDATE_CORE_FEEDER,
  GET_ODCs, 
  GET_SPLITTER_DATA_SUCCESSFUL,
  GET_CORE_FEEDER_INFO_SUCCESSFUL,
  GET_ODCs_SUCCESSFUL,
  GET_SELECTED_CORE_FEEDER,
  DELETE_SELECTED_CORE_FEEDER,
  DELETE_SELECTED_CORE_FEEDER_SUCCESSFUL,
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
  GET_ODC_PAGE_FAILED,
  ADD_ODC_DATA,
  ADD_ODC_DATA_SUCCESSFUL,
  ADD_ODC_DATA_FAILED,
  UPDATE_ODC_DATA,
  UPDATE_ODC_DATA_SUCCESSFUL,
  UPDATE_ODC_DATA_FAILED,
  DELETE_ODC_DATA,
  DELETE_ODC_DATA_SUCCESSFUL,
  DELETE_ODC_DATA_FAILED,
  GET_MEREK_LIST,
  GET_ODC_SPLITPANEL_DETAIL_SUCCESSFUL,
  GET_MEREK_LIST_FAILED,
  GET_MEREK_LIST_SUCCESSFUL,
  SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL,
  UPSERT_ODC_FILE,
  UPSERT_ODC_FILE_SUCCESSFUL,
  GET_PUBLIC_ODC_DETAIL,
  GET_PUBLIC_ODC_DETAIL_SUCCESSFUL,
} from "./actionTypes";
import { HYDRATE } from 'next-redux-wrapper';
const INIT_STATE = {
    loading:{
        get: false,
        getOdc:false,
        update:false,
        getSplitter:false,
        getOdcSplitpanelStatus:false,
        deleteOdcSplitpanelStatus: false,
        getRegionList:false,
        getWitelList: false,
        getDatelList: false,
        getSTOList: false,
        getMerekList: false,
        getODCPage:false,
        addODCData: false,
        updateODCData: false,
        deleteODCData: false,
        upsertFile: false,
    },
    tableRowsPerPage:0,
    add_odc_list:"",
    delete_odc_list:"",
    odc_page:"",
    merek_list:"",
    sto_list:"",
    datel_list:"",
    region_list:"",
    witel_list:"",
    graph_feeder:"",
    graph_distribution:"",
    coreFeederData:"",
    odcsBox:[],
    splitterData:"",
    selectedOdcSplitpanelStatus:"",
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
            getOdcSplitpanelStatus: true,
            getOdcSplitpanelDetail: true,
          },
          selectedOdcSplitpanelStatus: "",
          selectedOdcSplitpanelDetail: ""
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
      case GET_PUBLIC_ODC_DETAIL:

        return{
          ...state,
          loading:{
            ...state.loading,
            getOdcSplitpanelStatus: true,
            getOdcSplitpanelDetail: true,
          },
          selectedOdcSplitpanelStatus: "",
        }
        
        case GET_PUBLIC_ODC_DETAIL_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getOdcSplitpanelStatus: false
          },
          selectedOdcSplitpanelStatus: action.payload

        }
        case GET_ODC_SPLITPANEL_DETAIL_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getOdcSplitpanelDetail: false
          },
          selectedOdcSplitpanelDetail: action.payload

        }
      case DELETE_SELECTED_CORE_FEEDER:

        return{
          ...state,
          loading:{
            ...state.loading,
            deleteOdcSplitpanelStatus: true
          },
          deleteOdcSplitpanelStatus: ""
        }
        
        case DELETE_SELECTED_CORE_FEEDER_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            deleteOdcSplitpanelStatus: false
          },

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
      case GET_MEREK_LIST:

        return{
          ...state,
          loading:{
            ...state.loading,
            getMerekList: true
          }
        }
        
        case GET_MEREK_LIST_SUCCESSFUL:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getMerekList: false
          },
          merek_list: action.payload

        }

        case GET_ODC_PAGE:
          
        return{
          ...state,
          loading:{
            ...state.loading,
            getODCPage: true
          },
          odc_page:""
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
        case ADD_ODC_DATA:
            
          return {
              ...state,
              loading: {
                  ...state.loading,
                  addODCData:true
              }
          };
        case ADD_ODC_DATA_SUCCESSFUL:
          return {
              ...state,
              loading: {
                  ...state.loading,
                  addODCData:false
              },
          };
        case ADD_ODC_DATA_FAILED:
          return {
              ...state,
              loading: {
                  ...state.loading,
                  addODCData:false
              },
              add_odc_list: action.payload
          };
        case UPDATE_ODC_DATA:
            
          return {
              ...state,
              loading: {
                  ...state.loading,
                  updateODCData:true
              }
          };
        case UPDATE_ODC_DATA_SUCCESSFUL:
          return {
              ...state,
              loading: {
                  ...state.loading,
                  updateODCData:false
              },
          };
        case UPDATE_ODC_DATA_FAILED:
          return {
              ...state,
              loading: {
                  ...state.loading,
                  updateODCData:false
              },
          };
          case DELETE_ODC_DATA:
            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    deleteODCData:true
                }
            };
        case DELETE_ODC_DATA_SUCCESSFUL:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    deleteODCData:false
                }
            };
        case DELETE_ODC_DATA_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    deleteODCData:false
                },
                delete_odc_list: action.payload
            };
      case SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL:
            return{
              ...state,
              tableRowsPerPage: action.payload
            }
      case UPSERT_ODC_FILE:
        return {
          ...state,
          loading:{
            ...state.loading,
            upsertFile:true
          }
        }
      case UPSERT_ODC_FILE_SUCCESSFUL:
        return {
          ...state,
          loading:{
            ...state.loading,
            upsertFile:false
          },
        }
      default:
          return state;
  }
}

export default odcs;
