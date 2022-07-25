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
    UPDATE_ODC_PORT,
    GET_ACTIVITYLOG,
    GET_DASHBOARD_CARD,
    SET_TABEL_PAGE,
    SET_TABEL_SORT
} from './actionTypes'
import { ChangeOdcPageData, FeederDetail, GetDashCardData, IchangeODCPage, IdeleteSelectedCoreFeeder, IgetActivityLog, IgetDashCard, IgetOcdSplitpanelDetail, IgetOcdSplitpanelStatus, IsetSelectedCoreFeeder, IupdateNotes, IupdateODCPort, SetSelectedCoreFeederData } from './types';
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
export const setSelectedCoreFeeder = (data: SetSelectedCoreFeederData,handleClose:any,token:string,setSubmitting:any,toast:any,history:any): IsetSelectedCoreFeeder => ({
    type: SET_SELECTED_CORE_FEEDER,
    payload: {data,handleClose,token,setSubmitting,toast,history}
})

export const deleteSelectedCoreFeeder = (odcId:string,feeder:FeederDetail,setFeeder:any,handleClose:any,token:string,setSubmitting:any,toast:any,history:any): IdeleteSelectedCoreFeeder => ({
    type: DELETE_SELECTED_CORE_FEEDER,
    payload: {odcId,feeder,setFeeder,handleClose,token,setSubmitting,toast,history}
})

export const getSelectedCoreFeeder = (data) => ({
    type: GET_SELECTED_CORE_FEEDER,
    payload: data
})
export const getOcdSplitpanelStatus = (odcId:string,token:string,toast:any):IgetOcdSplitpanelStatus => ({
    type: GET_ODC_SPLITPANEL_STATUS,
    payload: {odcId,token,toast}
});

export const getPublicViewODC = (odcId,toast) => ({
    type: GET_PUBLIC_ODC_DETAIL,
    payload: {odcId,toast}
});

export const getOcdSplitpanelDetail = (odcId:string,token:string,toast:any): IgetOcdSplitpanelDetail => ({
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

export const changeODCPage = (data: ChangeOdcPageData,token:string,toast:any):IchangeODCPage => ({
    type: GET_ODC_PAGE,
    payload: {data,token,toast}
})

export const getDashCard = (data: GetDashCardData,token:string,toast:any): IgetDashCard => ({
    type: GET_DASHBOARD_CARD,
    payload: {data,token,toast}
})
export const setTableRowsPerPage = (value)=>({
    type: SET_ROWS_PER_PAGE,
    payload:{value}
})
export const setTablePage = (value)=>({
    type: SET_TABEL_PAGE,
    payload:{value}
})
export const setTableSort = (value)=>({
    type: SET_TABEL_SORT,
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


export const deleteODCData = (odc_name,odc_id,page,rowsPerPage,sort,token,deleteRowHandleClose,toast)=>({
    type: DELETE_ODC_DATA,
    payload: {odc_name,odc_id,page,rowsPerPage,sort,token,deleteRowHandleClose,toast}
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
    ,odc_id,token,setSubmitting,handleClose,toast,page,rowsPerPage,sort)=>({
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
        odc_id,token,setSubmitting,handleClose,toast,page,rowsPerPage,sort
    }
})

export const upsertODCFile = (name,odc_id,token,toast,kml,setKml,mc,setMc) => ({
    type: UPSERT_ODC_FILE,
    payload: {name,odc_id,token,toast,kml,setKml,mc,setMc}
})

export const updateNotes = (notes: string,odcId: string,token: string,toast: any): IupdateNotes => ({
    type: UPDATE_NOTES,
    payload: {notes,odcId,token,toast}
})

export const updateODCPort = (odcId: string,field_id: string,table_name: string,value: string,token: string,toast: any): IupdateODCPort => ({
    type: UPDATE_ODC_PORT,
    payload: {odcId,field_id,table_name,value,token,toast}
})

export const getActivityLog = (odcId: string,page: number,rowsPerPage: number,sortBy: string,sortOrder: string,token: string): IgetActivityLog => ({
    type: GET_ACTIVITYLOG,
    payload: {odcId,page,rowsPerPage,sortBy,sortOrder,token}
})

