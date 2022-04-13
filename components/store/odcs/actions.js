import {
    GET_SPLITTER_DATA,
    GET_GRAPH_FEEDER,
    GET_GRAPH_DISTRIBUTION,
    GET_CORE_FEEDER, 
    UPDATE_CORE_FEEDER,
    GET_ODCs,
    UPDATE_SPLITTER_DISTRIBUTION,
    SET_SELECTED_CORE_FEEDER,
    GET_SELECTED_CORE_FEEDER,
    GET_ODC_SPLITPANEL_STATUS,
    GET_REGION_LIST,
    GET_WITEL_LIST,
    GET_DATEL_LIST,
    GET_STO_LIST
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
export const getFeederGraph = (data,token) =>({
    type: GET_GRAPH_FEEDER,
    payload: {data,token}
});
export const getDistributionGraph = (data,token) =>({
    type: GET_GRAPH_DISTRIBUTION,
    payload: {data,token}
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
export const getOcdSplitpanelStatus = (odcId) => ({
    type: GET_ODC_SPLITPANEL_STATUS,
    payload: {odcId}
});
export const getRegionList = (token) => ({
    type: GET_REGION_LIST,
    payload: {token}
});
export const getWitelList = (token) => ({
    type: GET_WITEL_LIST,
    payload: {token}
});
export const getDatelList = (token) => ({
    type: GET_DATEL_LIST,
    payload: {token}
});
export const getSTOList = (token) => ({
    type: GET_STO_LIST,
    payload: {token}
});