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
    GET_ODC_SPLITPANEL_DETAIL,
    SET_ROWS_PER_PAGE,
    UPSERT_ODC_FILE,
    GET_PUBLIC_ODC_DETAIL,
    UPDATE_NOTES,
    UPDATE_ODC_PORT
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
export const deleteSelectedCoreFeeder = (odcId,feeder,setFeeder,handleClose,token,setSubmitting,toast,history) => ({
    type: DELETE_SELECTED_CORE_FEEDER,
    payload: {odcId,feeder,setFeeder,handleClose,token,setSubmitting,toast,history}
})
export const getSelectedCoreFeeder = (data) => ({
    type: GET_SELECTED_CORE_FEEDER,
    payload: data
})
export const getOcdSplitpanelStatus = (odcId,token,toast) => ({
    type: GET_ODC_SPLITPANEL_STATUS,
    payload: {odcId,token,toast}
});
export const getPublicViewODC = (odcId,toast) => ({
    type: GET_PUBLIC_ODC_DETAIL,
    payload: {odcId,toast}
});
export const getOcdSplitpanelDetail = (odcId,token,toast) => ({
    type: GET_ODC_SPLITPANEL_DETAIL,
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
export const changeODCPage = (page,rowsPerPage,region,witel,datel,sto,sortBy,sortOrder,token,toast) => ({
    type: GET_ODC_PAGE,
    payload: {page,rowsPerPage,region,witel,datel,sto,sortBy,sortOrder,token,toast}
})
export const setTableRowsPerPage = (value)=>({
    type: SET_ROWS_PER_PAGE,
    payload:{value}
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
    ,token,setSubmitting,handleClose,toast,rowsPerPage) => ({
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
        ,token,setSubmitting,handleClose,toast,rowsPerPage
    }
});

export const deleteODCData = (odc_name,odc_id,token,deleteRowHandleClose,toast)=>({
    type: DELETE_ODC_DATA,
    payload: {odc_name,odc_id,token,deleteRowHandleClose,toast}
})
export const updateODCData = (
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
    ,odc_id,token,setSubmitting,handleClose,toast,rowsPerPage)=>({
    type: UPDATE_ODC_DATA,
    payload: {
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
        sto_id,
        odc_id,token,setSubmitting,handleClose,toast,rowsPerPage
    }
})
export const upsertODCFile = (name,odc_id,token,toast,kml,setKml,mc,setMc) => ({
    type: UPSERT_ODC_FILE,
    payload: {name,odc_id,token,toast,kml,setKml,mc,setMc}
})
export const updateNotes = (notes,odcId,token,toast) => ({
    type: UPDATE_NOTES,
    payload: {notes,odcId,token,toast}
})

export const updateODCPort = (field_id,table_name,value,token,toast) => ({
    type: UPDATE_ODC_PORT,
    payload: {field_id,table_name,value,token,toast}
})