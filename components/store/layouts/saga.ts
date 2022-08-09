import {put,takeEvery,all,fork,call} from 'redux-saga/effects';
import { CHANGE_PAGE_TO, CHANGE_PAGE_TO_SUCCESSFUL } from './actionTypes';
import { IchangePageTo } from './types';

function* changePageTo({payload:{pathname}}:IchangePageTo){
    try {
        yield put({type: CHANGE_PAGE_TO_SUCCESSFUL, payload: pathname})
    } catch (error) {
        
    }
}

function* layoutWatchSaga(){
    yield takeEvery(CHANGE_PAGE_TO,changePageTo)
}

function* layoutSaga(){
    yield all([
        fork(layoutWatchSaga)
    ])
}

export default layoutSaga;