import {GET_SPLITTER_DATA,GET_CORE_FEEDER, UPDATE_CORE_FEEDER,GET_ODCs} from './actionTypes'
export const getSplitterData = () =>({
    type: GET_SPLITTER_DATA,
});
export const getCoreFeederInfo = () =>({
    type: GET_CORE_FEEDER,
});
export const getODCsBox = () =>({
    type: GET_ODCs,
});
export const updateCoreFeederInfo = (data) =>({
    type: UPDATE_CORE_FEEDER,
    payload: {data}
});