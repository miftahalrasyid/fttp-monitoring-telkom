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
    DELETE_SELECTED_CORE_FEEDER,
    DELETE_SELECTED_CORE_FEEDER_SUCCESSFUL,
    GET_ODC_SPLITPANEL_STATUS,
    GET_REGION_LIST,
    GET_WITEL_LIST,
    GET_DATEL_LIST,
    GET_STO_LIST,
    GET_MEREK_LIST,
    GET_ODC_PAGE,
    ADD_ODC_DATA,
    UPDATE_ODC_DATA,
    DELETE_ODC_DATA,
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
export const setSelectedCoreFeeder = (odcId,type,feeder_index,feeder_id,splitter_id,distribution_ids,handleClose,token,setSubmitting,toast,history) => ({
    type: SET_SELECTED_CORE_FEEDER,
    payload: {odcId,type,feeder_index,feeder_id,splitter_id,distribution_ids,handleClose,token,setSubmitting,toast,history}
})
export const deleteSelectedCoreFeeder = (odcId,feeder_index,feeder_id,handleClose,token,setSubmitting,toast,history) => ({
    type: DELETE_SELECTED_CORE_FEEDER,
    payload: {odcId,feeder_index,feeder_id,handleClose,token,setSubmitting,toast,history}
})
export const getSelectedCoreFeeder = (data) => ({
    type: GET_SELECTED_CORE_FEEDER,
    payload: data
})
export const getOcdSplitpanelStatus = (odcId,token,toast) => ({
    type: GET_ODC_SPLITPANEL_STATUS,
    payload: {odcId,token,toast}
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
export const getMerekList = (token,toast) => ({
    type: GET_MEREK_LIST,
    payload: {token,toast}
});
export const changeODCPage = (page,rowsPerPage,sortOrder,token,toast) => ({
    type: GET_ODC_PAGE,
    payload: {page,rowsPerPage,sortOrder,token,toast}
})

export const addODCData = (
    name,
    merek_id,
    port_feeder_terminasi,
    deployment_date,
    capacity,
    notes,
    panel_oa,
    rak_oa,
    port,
    odc_code,
    region_id,
    witel_id,
    datel_id,
    sto_id
    ,token,setSubmitting,handleClose,toast) => ({
    type: ADD_ODC_DATA,
    payload: {
        name,
        merek_id,
        port_feeder_terminasi,
        deployment_date,
        capacity,
        notes,
        panel_oa,
        rak_oa,
        port,
        odc_code,
        region_id,
        witel_id,
        datel_id,
        sto_id
        ,token,setSubmitting,handleClose,toast
    }
});

export const deleteODCData = (odc_name,idx,odc_id,token,setSubmitting,deleteRowHandleClose,toast)=>({
    type: DELETE_ODC_DATA,
    payload: {odc_name,idx,odc_id,token,setSubmitting,deleteRowHandleClose,toast}
})
export const updateODCData = (
    name,
    merk_id,
    port_feeder_terminasi,
    deployment_date,
    capacity,
    notes,
    panel_oa,
    rak_oa,
    port,
    odc_code,
    region_id,
    witel_id,
    datel_id,
    sto_id
    ,idx,user_id,token,setSubmitting,handleClose,toast)=>({
    type: UPDATE_ODC_DATA,
    payload: {
        name,
        merk_id,
        port_feeder_terminasi,
        deployment_date,
        capacity,
        notes,
        panel_oa,
        rak_oa,
        port,
        odc_code,
        region_id,
        witel_id,
        datel_id,
        sto_id
        ,idx,user_id,token,setSubmitting,handleClose,toast
    }
})