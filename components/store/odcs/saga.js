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
    GET_SELECTED_CORE_FEEDER,
    GET_ODC_SPLITPANEL_STATUS,
    GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,
    GET_REGION_LIST,
    GET_REGION_LIST_SUCCESSFUL,
    GET_WITEL_LIST,
    GET_WITEL_LIST_SUCCESSFUL,
} from './actionTypes';
// import firebase from '../../Firebase';

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

function* setSelectedCoreFeederSaga({payload:{elmId}}){
    try {
        console.log("set selected corefeeder",elmId);
        yield put({type:GET_SELECTED_CORE_FEEDER,payload:elmId});
    } catch (error) {
        console.log(error)
    }
}

function* fetchStatus({payload:{odcId}}){
    try {
        // console.log("get fetch status");
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/expOdcBox.json").then(res=>res.json());
        const filtered = yield res.filter(item=>item.odc_id===odcId);
        console.log("filtered", res, filtered[0],odcId)
        yield put({type:GET_ODC_SPLITPANEL_STATUS_SUCCESSFUL,payload:filtered[0]})
    } catch (error) {
        console.error(error)
    }
}
function* getFeederGraph({payload:{data,token}}){
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
        if(typeof window !== 'undefined')
        // res = yield fetch("/api/feeder-status-graph?region=&witel=&datel=&sto",requestOptions).then(res=>res.json());
        res = yield fetch(`/api/feeder-status-graph?region=${data.regional}&witel=${data.witel}&datel=${data.datel}&sto`,requestOptions).then(res=>res.json());
        else
        res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/feeder-status-graph?region=&witel=&datel=&sto`,requestOptions).then(res=>res.json());
        console.log("get feeder graph response",res)
        yield put({type:GET_GRAPH_FEEDER_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getfeedergraph",error)
    }
}
function* getDistributionGraph({payload:{data,token}}){
    console.log("get distribution graph",data,token)
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
        if(typeof window !== 'undefined')
        // res = yield fetch("/api/feeder-status-graph?region=&witel=&datel=&sto",requestOptions).then(res=>res.json());
        res = yield fetch(`/api/distribution-status-graph?region=${data.regional}&witel=${data.witel}&datel=${data.datel}&sto`,requestOptions).then(res=>res.json());
        else
        res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/distribution-status-graph?region=&witel=&datel=&sto`,requestOptions).then(res=>res.json());
        // console.log("get feeder graph response",res)
        yield put({type:GET_GRAPH_DISTRIBUTION_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getDistributionGraph",error)
    }
}
function* getRegionList({payload:{token}}) {
    console.log("region list",token)
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
        if(typeof window !== 'undefined')
        // res = yield fetch("/api/feeder-status-graph?region=&witel=&datel=&sto",requestOptions).then(res=>res.json());
        res = yield fetch(`/api/list-region`,requestOptions).then(res=>res.json());
        else
        res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/list-region`,requestOptions).then(res=>res.json());
        // console.log("get feeder graph response",res)
        yield put({type:GET_REGION_LIST_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getRegionList",error)
    }
}
function* getWitelList({payload:{token}}) {
    console.log("Witel list",token)
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
        if(typeof window !== 'undefined')
        // res = yield fetch("/api/feeder-status-graph?region=&witel=&datel=&sto",requestOptions).then(res=>res.json());
        res = yield fetch(`/api/list-witel?region=`,requestOptions).then(res=>res.json());
        else
        res = yield fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/list-witel?region=`,requestOptions).then(res=>res.json());
        // console.log("get feeder graph response",res)
        yield put({type:GET_WITEL_LIST_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log("getWitelList",error)
    }
}

function* watchODCsData(){
    yield takeEvery(GET_GRAPH_FEEDER,getFeederGraph)
    yield takeEvery(GET_GRAPH_DISTRIBUTION,getDistributionGraph)
    
    yield takeEvery(GET_SPLITTER_DATA,getSplitter)
    yield takeEvery(GET_CORE_FEEDER,getCoreFeeder)
    yield takeEvery(GET_ODCs,getODCsBox)
    yield takeEvery(UPDATE_CORE_FEEDER,updateCoreFeeder)
    yield takeEvery(UPDATE_SPLITTER_DISTRIBUTION,updateSplitterDistribution);
    yield takeEvery(SET_SELECTED_CORE_FEEDER,setSelectedCoreFeederSaga)

    yield takeEvery(GET_ODC_SPLITPANEL_STATUS,fetchStatus)
    
    yield takeEvery(GET_REGION_LIST,getRegionList)
    yield takeEvery(GET_WITEL_LIST,getWitelList)
}

function* odcsSaga() {
    yield all([
        fork(watchODCsData)
    ])
}

export default odcsSaga;