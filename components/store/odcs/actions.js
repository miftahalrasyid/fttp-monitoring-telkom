import {GET_CORE_FEEDER, UPDATE_CORE_FEEDER} from './actionTypes'
export const getCoreFeederInfo = () =>({
    type: GET_CORE_FEEDER,
});
export const updateCoreFeederInfo = (data) =>({
    type: UPDATE_CORE_FEEDER,
    payload: {data}
});