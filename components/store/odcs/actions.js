import {
    GET_SPLITTER_DATA,
    GET_CORE_FEEDER, 
    UPDATE_CORE_FEEDER,
    GET_ODCs,
    UPDATE_SPLITTER_DISTRIBUTION,
    SET_SELECTED_CORE_FEEDER,
    GET_SELECTED_CORE_FEEDER
} from './actionTypes'
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
export const updateSplitterDistributionInfo = (data) =>({
    type: UPDATE_SPLITTER_DISTRIBUTION,
    payload: {data}
});
export const setSelectedCoreFeeder = (elmId) => ({
    type: SET_SELECTED_CORE_FEEDER,
    payload: {elmId}
})
export const getSelectedCoreFeeder = (data) => ({
    type: GET_SELECTED_CORE_FEEDER,
    payload: data
})
export const getOcdSplitpanelStatus = () => ({
    type: GET_ODC_SPLITPANEL_STATUS,
});