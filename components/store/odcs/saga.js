import {call,all,put,fork,takeEvery} from 'redux-saga/effects';
import {
    GET_CORE_FEEDER,
    UPDATE_CORE_FEEDER,
    UPDATE_SPLITTER_DISTRIBUTION,
    GET_CORE_FEEDER_INFO_SUCCESSFUL,
    GET_ODCs_SUCCESSFUL,
    GET_ODCs,
    GET_SPLITTER_DATA,
    GET_SPLITTER_DATA_SUCCESSFUL,
    SET_SELECTED_CORE_FEEDER,
    GET_SELECTED_CORE_FEEDER
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
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/odcBox.json").then(res=>res.json());
        console.log("getODCsBox", res)
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

function* watchODCsData(){
    yield takeEvery(GET_SPLITTER_DATA,getSplitter)
    yield takeEvery(GET_CORE_FEEDER,getCoreFeeder)
    yield takeEvery(GET_ODCs,getODCsBox)
    yield takeEvery(UPDATE_CORE_FEEDER,updateCoreFeeder)
    yield takeEvery(UPDATE_SPLITTER_DISTRIBUTION,updateSplitterDistribution);
    yield takeEvery(SET_SELECTED_CORE_FEEDER,setSelectedCoreFeederSaga)
}

function* odcsSaga() {
    yield all([
        fork(watchODCsData)
    ])
}

export default odcsSaga;