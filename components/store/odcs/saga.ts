import { SettingsInputComponent } from '@material-ui/icons';
import {call,all,put,fork,takeEvery} from 'redux-saga/effects';
import {
    GET_CORE_FEEDER,
    GET_GRAPH_FEEDER,
    GET_GRAPH_FEEDER_SUCCESSFUL,
    GET_GRAPH_DISTRIBUTION,
    GET_GRAPH_DISTRIBUTION_SUCCESSFUL,
    UPDATE_CORE_FEEDER,
    UPDATE_SPLITTER_DISTRIBUTION,
    GET_CORE_FEEDER_INFO_SUCCESSFUL,
    GET_ODCs_SUCCESSFUL,
    GET_ODCs,
    GET_SPLITTER_DATA,
    GET_SPLITTER_DATA_SUCCESSFUL,
    SET_SELECTED_CORE_FEEDER,
    DELETE_SELECTED_CORE_FEEDER,
    DELETE_SELECTED_CORE_FEEDER_FAILED,
    GET_SELECTED_CORE_FEEDER,
    GET_ODC_SPLITPANEL_STATUS,
    GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,
    GET_ODC_SPLITPANEL_DETAIL,
    GET_ODC_SPLITPANEL_DETAIL_SUCCESSFUL,
    GET_REGION_LIST,
    GET_REGION_LIST_SUCCESSFUL,
    GET_WITEL_LIST,
    GET_WITEL_LIST_SUCCESSFUL,
    GET_DATEL_LIST,
    GET_DATEL_LIST_SUCCESSFUL,
    GET_STO_LIST,
    GET_STO_LIST_SUCCESSFUL,
    GET_MEREK_LIST,
    GET_MEREK_LIST_FAILED,
    GET_MEREK_LIST_SUCCESSFUL,
    GET_ODC_PAGE,
    GET_ODC_PAGE_SUCCESSFUL,
    GET_ODC_PAGE_FAILED,
    ADD_ODC_DATA,
    ADD_ODC_DATA_FAILED,
    UPDATE_ODC_DATA,
    UPDATE_ODC_DATA_FAILED,
    DELETE_ODC_DATA,
    DELETE_ODC_DATA_FAILED,
    SET_SELECTED_CORE_FEEDER_FAILED,
    SET_SELECTED_CORE_FEEDER_SUCCESSFUL,
    SET_ROWS_PER_PAGE,
    SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL,
    UPSERT_ODC_FILE,
    UPSERT_ODC_FILE_FAILED,
    GET_PUBLIC_ODC_DETAIL,
    GET_PUBLIC_ODC_DETAIL_SUCCESSFUL,
    UPDATE_NOTES,
    UPDATE_NOTES_FAILED,
    UPDATE_ODC_PORT,
    UPDATE_ODC_PORT_FAILED,
    ADD_ACTIVITYLOG,
    GET_ACTIVITYLOG,
    GET_ACTIVITYLOG_SUCCESSFUL,
    GET_DASHBOARD_CARD,
    GET_DASHBOARD_CARD_FAILED,
    GET_DASHBOARD_CARD_SUCCESSFUL,
    SET_TABEL_PAGE_SUCCESSFUL,
    SET_TABEL_PAGE,
    SET_TABEL_SORT_SUCCESSFUL,
    SET_TABEL_SORT
} from './actionTypes';
import {IdeleteSelectedCoreFeeder, IgetDistributionGraph, IgetFeederGraph, IsetSelectedCoreFeeder,IgetOcdSplitpanelStatus, IgetOcdSplitpanelDetail, IgetRegionList, IgetWitelList, IgetDatelList, IgetSTOList, IgetMerekList, IgetPublicViewODC, IaddODCData, IupdateODCData, IdeleteODCData, IsetTableRowsPerPage, IupsertODCFile, IupdateNotes, IupdateODCPort, IgetActivityLog, IchangeODCPage, ChangeOdcPageData, IgetDashCard, GetDashCardData, IsetTablePage, IsetTableSort} from './types';
import {changeODCPage} from './actions'
// import firebase from '../../Firebase';
/**
 * 
 * @param {requestOptions} set_core_feeder 
 * @returns 
 */
const setCoreFeederCall = (requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/core-feeder`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {requestOptions} delete_core_feeder 
 * @returns 
 */
const deleteCoreFeederCall = (requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/delete-feeder`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {odcId, requestOptions} odcId 
 * @param {*} requestOptions
 * @returns 
 */
const fetchODCDetailCall = (odcId,requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/view-odc/${odcId}`,requestOptions).then(rest=>rest.json())
/**
 * 
 * @param {odcId, requestOptions} odcId 
 * @param {*} requestOptions
 * @returns 
 */
const fetchODCDetailCall2 = (odcId,requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/get-odc/${odcId}`,requestOptions).then(rest=>rest.json())
/**
 * 
 * @param {regional,witel,datel,sto} data 
 * @param {*} requestOptions 
 * @returns 
 */
const getFeederGraphCall = (data,requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/feeder-status-graph?region=${data.regional}&witel=${data.witel}&datel=${data.datel}&sto`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} data 
 * @param {*} requestOptions 
 * @returns 
 */
const getDistributionGraphCall = (data,requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/distribution-status-graph?region=${data.regional}&witel=${data.witel}&datel=${data.datel}&sto`,requestOptions).then(res=>res.json());
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const getRegionListCall = (requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/list-region`,requestOptions).then(res=>res.json());
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const getWitelListCall = (requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/list-witel?region=`,requestOptions).then(res=>res.json());
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const getDatelListCall = (requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/list-datel?witel=`,requestOptions).then(res=>res.json());
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const getSTOListCall = (requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/list-sto?datel=`,requestOptions).then(res=>res.json());
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const getMerekListCall = (requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/list-merek`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} page 
 * @param {*} rowsPerPage 
 * @param {*} region 
 * @param {*} witel 
 * @param {*} datel 
 * @param {*} sto 
 * @param {*} sortBy 
 * @param {*} sortOrder 
 * @param {*} requestOptions 
 * @returns 
 */
const getOdcPageCall = (data: ChangeOdcPageData,requestOptions:any): Promise<any> => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/odc-paginate?limit=${data.rowsPerPage}&offset=${data.page!==0?data.page:1}&region=${data.region || ""}&witel=${data.witel || ""}&datel=${data.datel || ""}&sto=${data.sto || ""}&sorting=${data.sortBy || ""}&direction=${data.sortOrder || ""}&name=${data.name || ""}`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const addODCDataCall = (requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/add-odc`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} odc_id 
 * @param {*} requestOptions 
 * @returns 
 */
const updateODCDataCall = (odc_id,requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/update-odc/${odc_id}`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} odc_id 
 * @param {*} requestOptions 
 * @returns 
 */
const deleteODCDataCall = (odc_id,requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/delete-odc/${odc_id}`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} odc_id 
 * @param {*} requestOptions 
 * @returns 
 */
const upsertFileCall = (odc_id,requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/api/upload-file/${odc_id}`,requestOptions)
/**
 * 
 * @param {*} odc_id 
 * @param {*} requestOptions 
 * @returns 
 */
const publicViewODCCall = (odcId,requestOptions) => fetch(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/public-view-odc/${odcId}`,requestOptions).then(res=>res.json())
/**
 * 
 * @param {*} odc_id 
 * @param {*} requestOptions 
 * @returns 
 */
const updateNotesCall = (odcId,requestOptions) => fetch(`${typeof window !=='undefined' ? "":process.env.NEXT_PUBLIC_API_HOST}/api/dynamic-update/${odcId}`,requestOptions).then(rest=>rest.json())
/**
 * 
 * @param {*} field_id 
 * @param {*} requestOptions 
 * @returns 
 */
const updateODCPortStatusCall = (field_id,requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/dynamic-update/${field_id}`,requestOptions).then(rest=>rest.json())
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const addActivityLogCall = (requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/add-log`,requestOptions).then(rest=>rest.json())
/**
 * 
 * @param {*} requestOptions 
 * @returns 
 */
const getActivityLogCall = (odcId,page,rowsPerPage,sortBy,sortOrder,requestOptions) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/get-log?limit=${rowsPerPage}&offset=${page!==0?page:1}&odc_id=${odcId}&sorting=${sortBy || ""}&direction=${sortOrder || ""}`,requestOptions).then(rest=>rest.json())
/**
 * 
 * @param {region,witel,datel,sto} data 
 * @param {*} requestOptions 
 * @returns 
 */
const getDashCardCall = (data: GetDashCardData,requestOptions:any) => fetch(`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/get-card?&region=${data.region || ""}&witel=${data.witel || ""}&datel=${data.datel || ""}&sto=${data.sto || ""}`,requestOptions).then(rest=>rest.json())

function* getSplitter() {
    try {
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/splitterDistribution.json").then(res=>res.json());
        // console.log("test",res)
        yield put({type:GET_SPLITTER_DATA_SUCCESSFUL,payload:res})
    } catch (error) {
        console.error(error)
    }
}
function* getCoreFeeder(){
    try {
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/coreFeeder.json").then(res=>res.json());
        // console.log("test",res)
        yield put({type:GET_CORE_FEEDER_INFO_SUCCESSFUL,payload:res})
    } catch (error) {
        console.error(error)
    }
}
function* getODCsBox(){
    // console.log("getODCsBox")
    try {
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/odcList.json").then(res=>res.json());
        // const res = yield fetch("https://my-project-1550730936778.firebaseio.com/odcBox.json").then(res=>res.json());
        // console.log("getODCsBox", res)
        yield put({type:GET_ODCs_SUCCESSFUL,payload:res})
    } catch (error) {
        console.error(error)
    }
}
function* updateCoreFeeder({payload:{data}}){
    try {
        const app = require('../../Firebase').getFirebaseBackend();
        // console.log("app",app)
        // console.log("update core feeder",data)
        yield call(app.setSplitter,{odcboxIndex:data.odcIndex,feederIndex:data.feederIndex,newData:{splitter:data["splitter-select"]}})
        const res = yield call(app.setDistributor,{odcboxIndex:data.odcIndex,splitter:data["splitter-select"],distributorIndexses: data.distributorIndexes})
        // app.setSplitter({odcboxIndex:data.odcIndex,feederIndex:data.id,newData:{splitter:data["splitter-select"]}});
        // if(typeof window !== undefined)
        // console.log()
        // import { getFirebaseBackend } from '../../Firebase';
        const requestRuleSplitter = {
            method:"PATCH",
            headers: {
                "Access-Controll-Allow-Origin": "*",
                "Access-Controll-Allow-Method": "PATCH",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({splitter:data.splitter})
        }
        const requestRuleDistributor = {
            method:"PATCH",
            headers: {
                "Access-Controll-Allow-Origin": "*",
                "Access-Controll-Allow-Method": "PATCH",
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data.prevDistributors)
        }
        // const response = yield fetch(`https://my-project-1550730936778.firebaseio.com/odcBox/${data.odcIndex}/feeder/data/${data.id}.json`,requestRuleSplitter);
        // const datas = yield response.json();
        // const response1 = yield fetch(`https://my-project-1550730936778.firebaseio.com/odcBox/${data.odcIndex}/distributor/data.json`,requestRuleDistributor);
        // const datas1 = yield response1.json();
        // console.log(datas)
        // console.log(datas1)
        // console.log("res ditribute",res)
        // if(res.response==200)
        yield put({type:GET_ODCs});
    } catch (error) {
        console.log(error)
    }
}
function* updateSplitterDistribution({payload:{data}}){
    try {
        // console.log("update SplitterDistribution ",yield getFirebaseBackend())
        const requestRule = {
            method:"PATCH",
            headers: {
                "Access-Controll-Allow-Origin": "*",
                "Access-Controll-Allow-Method": "PATCH",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({gpon:parseInt(data.gpon),core:parseInt(data.core),modul:parseInt(data.modul),port:parseInt(data.port)})
        }
        // const response = yield fetch(`https://my-project-1550730936778.firebaseio.com/splitterDistribution/${data.id-1}.json`,requestRule);
        // const datas = yield response.json();
        // console.log(datas)
    } catch (error) {
        console.log(error)
    }
}

function* setSelectedCoreFeederSaga({payload:{data,handleClose,token,setSubmitting,toast,history}}: IsetSelectedCoreFeeder){
    try {
        if(!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer "+token);

        var formdata = new FormData();
        formdata.append("feeder_id", data.feeder_id.toString());
        formdata.append("splitter_id", data.splitter_id.toString());
        formdata.append("distribution", JSON.stringify(data.distribution_ids));

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        const res = yield setCoreFeederCall(requestOptions)
        .then(result=>{
            if(!result.success){
                setSubmitting(false);
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:SET_SELECTED_CORE_FEEDER_SUCCESSFUL,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:SET_SELECTED_CORE_FEEDER_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})

                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            // console.log("success added")
            setSubmitting(false)
            handleClose();
            data.setFeederFocus({
                distribution: [
                {
                  distribution_id: "",
                  distribution_index: null,
                  distribution_level: null,
                  distribution_level_id: null
                }, {
                  distribution_id: "",
                  distribution_index: null,
                  distribution_level: null,
                  distribution_level_id: null
                }, {
                  distribution_id: "",
                  distribution_index: null,
                  distribution_level: null,
                  distribution_level_id: null
                }, {
                  distribution_id: "",
                  distribution_index: null,
                  distribution_level: null,
                  distribution_level_id: null
                }],
                
                distributionElm: [null, null, null, null],
                feeder: {feeder_id: '', feeder_index: null, feeder_level: null},
                feederElm: null,
                odpName: ['', '', '', ''],
                splitter: {splitter_id: '', splitter_index: null},
                splitterElm: null
              })
            toast.success(`Feeder ${data.feeder_index} berhasil ${(data.type!=="edit"?"ditambahkan":"diupdate")}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // yield history.reload(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/odc/${odcId}`)
            yield call(addActivityLog,({payload:{odcId:data.odcId,table_name:`feeder ${data.feeder_index}`,action:`User ${(data.type!=="edit"?"menambahkan":"mengupdate")}`,token}}))
            yield put({type:GET_ODC_SPLITPANEL_STATUS,payload:{odcId:data.odcId,token,toast}})
        }

    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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

function* deleteSelectedCoreFeederSaga({payload:{odcId,feeder:{feeder_index,feeder_id},setFeeder,handleClose,token,setSubmitting,toast,history}}: IdeleteSelectedCoreFeeder){
    // console.log("delete core feeder ",feeder_id)
    try {
        if(!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer "+token);

        var formdata = new FormData();
        formdata.append("feeder_id", feeder_id.toString());

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        const res = yield deleteCoreFeederCall(requestOptions)
        .then(result=>{
            if(!result.success){
                setSubmitting(false);
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:DELETE_SELECTED_CORE_FEEDER_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:DELETE_SELECTED_CORE_FEEDER_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})

                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            console.log("success added")
            setSubmitting(false)
            setFeeder({
                distribution: [
                    {
                      distribution_id: "",
                      distribution_index: null,
                      distribution_level: null,
                      distribution_level_id: null
                    }, {
                      distribution_id: "",
                      distribution_index: null,
                      distribution_level: null,
                      distribution_level_id: null
                    }, {
                      distribution_id: "",
                      distribution_index: null,
                      distribution_level: null,
                      distribution_level_id: null
                    }, {
                      distribution_id: "",
                      distribution_index: null,
                      distribution_level: null,
                      distribution_level_id: null
                    }],
                    
                    distributionElm: [null, null, null, null],
                    feeder: {feeder_id: '', feeder_index: null, feeder_level: null},
                    feederElm: null,
                    odpName: ['', '', '', ''],
                    splitter: {splitter_id: '', splitter_index: null},
                    splitterElm: null
            })
            handleClose[0]();
            handleClose[1]();
            toast.success("Feeder "+feeder_index+" berhasil didelete", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // yield history.reload(`${(typeof window !== 'undefined')?"":process.env.NEXT_PUBLIC_API_HOST}/odc/${odcId}`)
            yield put({type:ADD_ACTIVITYLOG,payload:{odcId,table_name:`feeder ${feeder_index}`,action:`User mendelete`,token}})
            yield put({type:GET_ODC_SPLITPANEL_STATUS,payload:{odcId,token,toast}})
        }

    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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

function* fetchStatus({payload:{odcId,token,toast}}: IgetOcdSplitpanelStatus){
    try {
        console.log("re fetch status")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
        // console.log("get fetch status",token,`${process.env.NEXT_PUBLIC_API_HOST}/api/view-odc/`);
        const rest = yield fetchODCDetailCall(odcId,requestOptions)
        // console.log("fetch status", rest)
        // rest.then(res=>res.json())

        // console.log("odc ktm fs",rest)
        // const res = yield fetch("https://my-project-1550730936778.firebaseio.com/expOdcBox.json").then(res=>res.json());
        // const filtered = yield res.filter(item=>item.odc_id===odcId);
        // console.log("filtered", res, filtered[0],odcId)
        yield put({type:GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,payload:rest})
        // yield put({type:GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,payload:filtered[0]})
    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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
function* getFeederGraph({payload:{data,token}}: IgetFeederGraph){
    console.log("get feeder graph",data,token)
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield call(getFeederGraphCall,data,requestOptions);

        // console.log("get feeder graph response",res)
        yield put({type:GET_GRAPH_FEEDER_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getfeedergraph",error)
    }
}
function* getDistributionGraph({payload:{data,token}}:IgetDistributionGraph){
    // console.log("get distribution graph",data,token)
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield call(getDistributionGraphCall,data,requestOptions)
       
        // console.log("get feeder graph response",res)
        yield put({type:GET_GRAPH_DISTRIBUTION_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getDistributionGraph",error)
    }
}
function* getRegionList({payload:{token}}: IgetRegionList) {
    // console.log("region list",token)
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield call(getRegionListCall,requestOptions)
        // console.log("get feeder graph response",res)
        yield put({type:GET_REGION_LIST_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getRegionList",error)
    }
}
function* getWitelList({payload:{token}}: IgetWitelList) {
    // console.log("Witel list",token)
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield call(getWitelListCall,requestOptions)
        // console.log("get feeder graph response",res)
        yield put({type:GET_WITEL_LIST_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getWitelList",error)
    }
}
function* getDatelList({payload:{token}}: IgetDatelList) {
    // console.log("Datel list",token)
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield call(getDatelListCall,requestOptions)
        // console.log("get feeder graph response",res)
        yield put({type:GET_DATEL_LIST_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getDatelList",error)
    }
}
function* getSTOList({payload:{token}}: IgetSTOList) {
    console.log("STO list",token)
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        let res;
        res = yield call(getSTOListCall,requestOptions)
        // console.log("get feeder graph response",res)
        yield put({type:GET_STO_LIST_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getSTOList",error)
    }
}

function* getMerekList({payload:{token,toast}}: IgetMerekList){
   
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    try {
        // if(!navigator.onLine) {
        //     toast.error("Anda tidak terhubung dengan internet", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //       });
        //     return; 
        // }
        
        console.log("get merek list")
        
        const res = yield getMerekListCall(requestOptions)
        
        .then(result=>{
            // console.log("error sgga",result)
            if(!result.success){
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:ADD_ODC_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:ADD_ODC_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})

                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });   
        
        if(res.success){
            console.log("merek list response ",res)
            yield put({type:GET_MEREK_LIST_SUCCESSFUL,payload:res})
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
        console.log("getSTOList",error)
    }
}
function* getDashCard({payload:{data,token,toast}}: IgetDashCard){
    try {
        var requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+token,
                "Content-Type":"application/json",
            },
            redirect: 'follow'
        };
        let res = yield getDashCardCall(data,requestOptions)
        .then(result => {
            if(!result.success){
                console.log("result false", result)
                put({type:GET_DASHBOARD_CARD_FAILED,payload:result.msg})
                toast.error(result.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            return result
        })
        if(res.success){
            // console.log("get odc page",res)
            yield put({type:GET_DASHBOARD_CARD_SUCCESSFUL,payload:res})
        }
    } catch (error) {
        
    }
}
function* getODCPage(props) {
    const {payload:{data,token,toast}}: IchangeODCPage = props
    // const {payload:{data:{page,rowsPerPage,region,witel,datel,sto,sortBy,sortOrder},token,toast}}: IchangeODCPage = props
    var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json",
        },
        redirect: 'follow'
      };
    //   console.log("on odc page change",data);
    try {
        let res = yield getOdcPageCall(data,requestOptions)
        .then(result => {
            // console.log("result true", result.data)
            if(!result.success){
                console.log("result false", result)
                put({type:GET_ODC_PAGE_FAILED,payload:result.msg})
                toast.error(result.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(result.success){
                // console.log("result true", result.data)
                return {success:result.success,data:result.data,count:result.total_rows,sortOrder:data.sortOrder,page:data.page-1}
                // return {success:result.success,data:result.data,count:result.data.length,sortOrder,page}
            }
        });
        if(res.success){
            console.log("get odc page",res)
            yield put({type:GET_ODC_PAGE_SUCCESSFUL,payload:res})
        }
    } catch (error) {
        console.log(error)
        if(toast)
        toast.error("Maaf, ada kesalahan teknis", {
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

function* addODCData({payload:{
    name,
    merek_id,
    deployment_date,
    capacity,
    region_id,
    witel_id,
    datel_id,
    sto_id,
    port_feeder_terminasi,
    panel_oa,
    rak_oa,
    port
    ,token,setSubmitting,handleClose,toast,rowsPerPage
}}: IaddODCData){
    try {
        console.log("masuk add odc data saga")
        if(!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer "+token);
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("merek_id", merek_id);
        formdata.append("port_feeder_terminasi", port_feeder_terminasi);
        formdata.append("deployment_date", deployment_date);
        formdata.append("capacity", capacity);
        formdata.append("panel_oa", panel_oa);
        formdata.append("rak_oa", rak_oa);
        formdata.append("port", port);
        /** odc name dengan penghubung - */
        // formdata.append("odc_code", odc_code);
        formdata.append("region_id", region_id);
        formdata.append("witel_id", witel_id);
        formdata.append("datel_id", datel_id);
        formdata.append("sto_id", sto_id);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        const res = yield addODCDataCall(requestOptions)
        
        .then(result=>{
            // console.log("error sgga",result)
            if(!result.success){
                setSubmitting(false);
                if(result.msg=='Method must be one of: OPTIONS'){
                    toast.error("Gagal memanggil API", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:ADD_ODC_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
                    toast.error(result.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    return put({type:ADD_ODC_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})

                }
            }
            else {
                return {success:result.success,odc_id: result.odc_id,data:result.data}
            }
        });        
        if(res.success){
            // console.log("success added",res)
            setSubmitting(false)
            handleClose();
            toast.success(name+" berhasil ditambahkan", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              yield call(addActivityLog,({payload:{odcId:res.odc_id,table_name:`ODC`,action:`User menambahkan`,token}}))
              if(rowsPerPage){
                yield call(getODCPage,({payload:{data:{page:0,rowsPerPage,sortBy:"",sortOrder:""},token,toast}}))
              }
            // yield put({type:GET_ODC_PAGE,payload:{page:1,rowsPerPage,sortOrder:{name:"",direction:"asc"},token}})
        }
    } catch (error) {
        console.log("saga add odc error" ,error)
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

function* updateODCData({payload:{
    name,
    deployment_date,
    notes,
    panel_oa,
    rak_oa,
    port,
    odc_code,
    region_id,
    witel_id,
    datel_id,
    sto_id
    ,odc_id,token,setSubmitting,handleClose,toast,page,rowsPerPage,sort
}}: IupdateODCData){
    // console.log("updateODCData",odc_id)
    try {
        /** jika offline */
        if(!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer "+token);
        var formdata = new FormData();
        
        formdata.append("name", name);
        formdata.append("deployment_date", deployment_date);
        formdata.append("notes",  "");
        formdata.append("panel_oa", panel_oa);
        formdata.append("rak_oa", rak_oa);
        formdata.append("port", port);
        formdata.append("odc_code", odc_code);
        formdata.append("region_id", region_id);
        formdata.append("witel_id", witel_id);
        formdata.append("datel_id", datel_id);
        formdata.append("sto_id", sto_id);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        const res = yield updateODCDataCall(odc_id,requestOptions)
        
        .then(result=>{
            if(!result.success){
                setSubmitting(false)
                // setSubmitting(prev=>{
                //     prev[idx].status = false;
                //     return {...prev}
                // })
                if(result.msg=='Method must be one of: OPTIONS'){
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
                    return put({type:UPDATE_ODC_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
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
                    return put({type:UPDATE_ODC_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            // handleClose(idx)
            handleClose()
            // console.log("set submit",setSubmitting)
            setSubmitting(false)
            // setSubmitting(prev=>{
            //     console.log("prev",prev)
            //     if(idx)
            //     return false
            //     else{
            //         prev[idx].status = false;
            //         return {...prev}
            //     }
            // })
            toast.success("odc berhasil di update", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              yield call(addActivityLog,({payload:{odcId:odc_id,table_name:`ODC`,action:`User mengupdate`,token}}))
              
            //   yield call(getODCPage,({payload:{page:1,rowsPerPage,region:null,witel:null,datel:null,sto:null,sortBy:null,sortOrder:null,token,toast}}))
                if(rowsPerPage){
                    yield call(getODCPage,({payload:{data:{page,rowsPerPage,...sort},token,toast}}))
                }
              else
              yield put({type:GET_ODC_SPLITPANEL_STATUS,payload:{odcId:odc_id[0],token,toast}})
        }
    } catch (error) {
        console.log("saga update odc error" ,error)
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

function* deleteODCData({payload:{odc_name,odc_id,page,rowsPerPage,sort,token,deleteRowHandleClose,toast}}: IdeleteODCData){
    try {
        if(!navigator.onLine) {
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
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
        const res = yield deleteODCDataCall(odc_id,requestOptions)
        .then(result=>{
            // console.log("error sgga",result)
            if(!result.success){
                if(result.msg=='Method must be one of: OPTIONS'){
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
                    return put({type:DELETE_ODC_DATA_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
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
                    return put({type:DELETE_ODC_DATA_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });        
        if(res.success){
            deleteRowHandleClose(false)
            toast.success(odc_name+" berhasil di delete", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              yield call(addActivityLog,({payload:{odcId:odc_id,table_name:`ODC`,action:`User mendelete`,token}}))
              yield call(getODCPage,({payload:{data:{page,rowsPerPage,sortBy:sort.sortBy,sortOrder:sort.sortOrder},token,toast}}))
        }
        else{
            yield res
        }
    } catch (error) {
        console.log("saga delete odc error" ,error)
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
function* fetchODCDetail({payload:{odcId,token,toast}}: IgetOcdSplitpanelDetail) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
    
        const res = yield fetchODCDetailCall2(odcId,requestOptions)
        //   console.log("fetch odc detail", res)
        yield put({type:GET_ODC_SPLITPANEL_DETAIL_SUCCESSFUL,payload:(res && res.success)? res  : {"data": {
            id:"",
            name:"",
            merek_id:"",
            port_feeder_terminasi: 0,
            deployment_date: "",
            capacity:0,
            notes:"",
            panel_oa:"",
            rak_oa: "",
            port:"2",
            status:false,
            created_at:"",
            created_by:"",
            updated_at:"",
            updated_by: "",
            mc_file:"",
            kml_file:"",
            region_id:0,
            witel_id:0,
            datel_id:0,
            sto_id:0,
        }}})

    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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
function* setTableRowsPerPage({payload:{value}}:IsetTableRowsPerPage){
    try {
        yield put({type: SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL,payload:value})
    } catch (error) {
        
    }
}
function* setTablePage({payload:{value}}:IsetTablePage){
    try {
        yield put({type: SET_TABEL_PAGE_SUCCESSFUL,payload:value})
    } catch (error) {
        
    }
}
function* setTableSort({payload:{value}}:IsetTableSort){
    try {
        yield put({type: SET_TABEL_SORT_SUCCESSFUL,payload:value})
    } catch (error) {
        
    }
}
// function* setTableRowsPerPage({payload:{value}}:IsetTableRowsPerPage){
//     try {
//         yield put({type: SET_TABEL_ROWS_PER_PAGE_SUCCESSFUL,payload:value})
//     } catch (error) {
        
//     }
// }

function* upsertFile({payload:{name,odc_id,token,toast,kml,setKml,mc,setMc}}: IupsertODCFile){
    // console.log("saga kml",kml,odc_id,token)
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization",`Bearer ${token}`);
        var formdata = new FormData();
        if(kml instanceof File)
        formdata.append("kml_file", kml, kml.name);
        if(mc instanceof File)
        formdata.append("mc_file", mc, mc.name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        }
        var res = yield upsertFileCall(odc_id,requestOptions)
        .then(rest=>{
            if(rest.status==413){
                toast.error("file terlalu besar", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                // errorState({status:true,msg:"Gagal memanggil API"});
                return put({type:UPSERT_ODC_FILE_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
            }
            return rest.json()})
        // console.log("saga upsert file",res)
        .then(result=>{
            // console.log("error sgga",result)
            if(!result.success){
                
                if(result.msg=='Method must be one of: OPTIONS'){
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
                    return put({type:UPSERT_ODC_FILE_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
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
                    return put({type:UPSERT_ODC_FILE_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            else {
                return {success:result.success,data:result.data}
            }
        });   
        if(res.success){
            toast.success(`${kml? "KML":"MC"} file berhasil di update`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield call(addActivityLog,({payload:{odcId:odc_id,table_name:`${kml? "KML":"MC"}`,action:`User mengupdate`,token}}))
            if(kml)
            setKml([])
            else
            setMc([])
            yield put({type:GET_ODC_SPLITPANEL_STATUS,payload:{odcId:odc_id,token,toast}})
        }
        // else{
        //     toast.error("MC file gagal di update", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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

function* publicViewODC({payload:{odcId,toast}}: IgetPublicViewODC){
    try {
        // console.log("re fetch status")
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
        // console.log("get fetch status",token,`${process.env.NEXT_PUBLIC_API_HOST}/api/view-odc/`);
        const rest = yield publicViewODCCall(odcId,requestOptions)
        // console.log("odc ktm fs",rest)
        // const res = yield fetch("https://my-project-1550730936778.firebaseio.com/expOdcBox.json").then(res=>res.json());
        // const filtered = yield res.filter(item=>item.odc_id===odcId);
        // console.log("filtered", res, filtered[0],odcId)
        yield put({type:GET_PUBLIC_ODC_DETAIL_SUCCESSFUL,payload:rest})
        // yield put({type:GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,payload:filtered[0]})
    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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
function* updateNotes({payload:{notes,odcId,token,toast}}: IupdateNotes) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var formdata = new FormData();
        formdata.append("table_name","odc");
        formdata.append("field_name","notes");
        formdata.append("value",notes);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        var res = yield updateNotesCall(odcId,requestOptions)
        .then(result=>{
            if(!result.success){
                
                if(result.msg=='Method must be one of: OPTIONS'){
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
                    return put({type:UPDATE_NOTES_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
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
                    return put({type:UPDATE_NOTES_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            return result
        })
        if(res.success){
            toast.success(`notes berhasil di update`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield call(addActivityLog,({payload:{odcId,table_name:`notes`,action:`User mengupdate`,token}}))
            yield put({type:GET_ODC_SPLITPANEL_STATUS,payload:{odcId,token,toast}})
        }
    } catch (error) {
        console.error(error)
        toast.error("Maaf, ada kesalahan teknis", {
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

function* updateODCPortStatus({payload: {odcId,field_id,table_name,value,token,toast}}: IupdateODCPort) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        var formdata = new FormData();
        formdata.append("table_name", table_name);
        formdata.append("field_name", "status");
        formdata.append("value", value);
        var requestOptions= {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        }
        var res = yield updateODCPortStatusCall(field_id,requestOptions)
        .then(result=>{
            if(!result.success){

                if(result.msg=='Method must be one of: OPTIONS'){
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
                    return put({type:UPDATE_ODC_PORT_FAILED,payload:{success:false,data:[],msg:"Gagal memanggil API"}})
                }
                else{
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
                    return put({type:UPDATE_ODC_PORT_FAILED,payload:{success:result.success,data:[],msg:result.msg || result.message}})
                }
            }
            return result
        });
        if(res.success){
            toast.success(`status ${table_name} berhasil di update`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            yield call(addActivityLog,({payload:{odcId,table_name:`status ${table_name}`,action:`User mengupdate`,token}}))
            // console.log("log",lol)
            // console.log("add activity log",addActivityLog)
            // yield call(addActivityLog,{payload:"test"})
            // yield put({type:ADD_ACTIVITYLOG,payload:{odcId,table_name:`status ${table_name}`,action:`User mengupdate`,token}})
            yield put({type:GET_ODC_SPLITPANEL_STATUS,payload:{odcId,token,toast}})
        }
    } catch (error) {
        
    }
}
function* addActivityLog(browse){
    const {payload:{odcId,table_name,action,token}} = browse;
    // function* addActivityLog({payload:{odcId,table_name,action,token}}){
    console.log("odc id",odcId)
    
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        var formdata = new FormData();
        formdata.append("odc_id", odcId);
        formdata.append("table_name", table_name);
        formdata.append("action", action);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        var res = yield addActivityLogCall(requestOptions)
        .then(result=>{
            return result;
        })
        if(res.success){

        }
    } catch (error) {
        
    }
}
function* getActivityLog({payload:{odcId,page,rowsPerPage,sortBy,sortOrder,token}}: IgetActivityLog){
    try {
        console.log("get activity log",odcId)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Cookie", "PHPSESSID=h9m2nju1qgp3oneuhbres6907h");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        // console.log("fetch url",`${typeof window !== 'undefined' ? "" : process.env.NEXT_PUBLIC_API_HOST}/api/get-log?limit=${rowsPerPage}&offset=${page!==0?page:1}&odc_id=${odcId}&sorting=${sortBy || ""}&direction=${sortOrder || ""}`)
        var res = yield getActivityLogCall(odcId,page,rowsPerPage,sortBy,sortOrder,requestOptions)
        .then(result=>{

            return {success:result.success,data:result.data,count:result.total_rows,sortOrder,page:page-1};
        })
        if(res.success){
            console.log("activity log res",res)
                // console.log("result true", result.data)
                // return {success:result.success,data:result.data,count:result.data.length,sortOrder,page}
            yield put({type: GET_ACTIVITYLOG_SUCCESSFUL,payload:res})
            // return {success:result.success,data:result.data,count:result.total_rows,sortOrder,page:page-1}
        }
    } catch (error) {
        console.log("get activity log error",error)
    }
}

function* watchODCsData(){
    yield takeEvery(GET_GRAPH_FEEDER,getFeederGraph)
    yield takeEvery(GET_GRAPH_DISTRIBUTION,getDistributionGraph)
    
    // yield takeEvery(GET_SPLITTER_DATA,getSplitter)
    // yield takeEvery(GET_CORE_FEEDER,getCoreFeeder)
    // yield takeEvery(GET_ODCs,getODCsBox)
    // yield takeEvery(UPDATE_CORE_FEEDER,updateCoreFeeder)
    // yield takeEvery(UPDATE_SPLITTER_DISTRIBUTION,updateSplitterDistribution);
    yield takeEvery(SET_SELECTED_CORE_FEEDER,setSelectedCoreFeederSaga)
    yield takeEvery(DELETE_SELECTED_CORE_FEEDER,deleteSelectedCoreFeederSaga)

    yield takeEvery(GET_ODC_SPLITPANEL_STATUS,fetchStatus)
    yield takeEvery(GET_ODC_SPLITPANEL_DETAIL,fetchODCDetail)
    yield takeEvery(GET_PUBLIC_ODC_DETAIL,publicViewODC)
    
    yield takeEvery(GET_REGION_LIST,getRegionList)
    yield takeEvery(GET_WITEL_LIST,getWitelList)
    yield takeEvery(GET_DATEL_LIST,getDatelList)
    yield takeEvery(GET_STO_LIST,getSTOList)
    yield takeEvery(GET_MEREK_LIST,getMerekList)
    
    yield takeEvery(GET_ODC_PAGE,getODCPage)
    yield takeEvery(ADD_ODC_DATA,addODCData)
    yield takeEvery(UPDATE_ODC_DATA,updateODCData)
    yield takeEvery(DELETE_ODC_DATA,deleteODCData)

    yield takeEvery(SET_ROWS_PER_PAGE,setTableRowsPerPage)
    yield takeEvery(SET_TABEL_PAGE,setTablePage)
    yield takeEvery(SET_TABEL_SORT,setTableSort)

    yield takeEvery(UPSERT_ODC_FILE,upsertFile)

    yield takeEvery(UPDATE_NOTES,updateNotes);

    yield takeEvery(UPDATE_ODC_PORT,updateODCPortStatus);

    yield takeEvery(ADD_ACTIVITYLOG,addActivityLog);
    yield takeEvery(GET_ACTIVITYLOG,getActivityLog);

    yield takeEvery(GET_DASHBOARD_CARD,getDashCard);
}

function* odcsSaga() {
    yield all([
        fork(watchODCsData)
    ])
}

export default odcsSaga;