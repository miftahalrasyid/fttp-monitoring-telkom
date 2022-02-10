import {all,put,fork,takeEvery} from 'redux-saga/effects';
import {
    GET_CORE_FEEDER,
    UPDATE_CORE_FEEDER,
    GET_CORE_FEEDER_INFO_SUCCESSFUL,
} from './actionTypes';

function* getCoreFeeder(){
    try {
        const res = yield fetch("https://my-project-1550730936778.firebaseio.com/coreFeeder.json").then(res=>res.json());
        console.log("test",res)
        yield put({type:GET_CORE_FEEDER_INFO_SUCCESSFUL,payload:res})
    } catch (error) {
        console.log(error)
    }
}
function* updateCoreFeeder({payload:{data}}){
    try {
        // console.log("update core feeder",data)
        const requestRule = {
            method:"PATCH",
            headers: {
                "Access-Controll-Allow-Origin": "*",
                "Access-Controll-Allow-Method": "PATCH",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({gpon:parseInt(data.gpon),core:parseInt(data.core),modul:parseInt(data.modul),port:parseInt(data.port)})
        }
        const response = yield fetch(`https://my-project-1550730936778.firebaseio.com/coreFeeder/${data.id}.json`,requestRule);
        const datas = yield response.json();
        // console.log(datas)
    } catch (error) {
        console.log(error)
    }
}

function* watchODCsData(){
    yield takeEvery(GET_CORE_FEEDER,getCoreFeeder)
    yield takeEvery(UPDATE_CORE_FEEDER,updateCoreFeeder)
}

function* odcsSaga() {
    yield all([
        fork(watchODCsData)
    ])
}

export default odcsSaga;