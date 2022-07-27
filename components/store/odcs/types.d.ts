import { GET_DASHBOARD_CARD, SET_ROWS_PER_PAGE, SET_TABEL_PAGE, SET_TABEL_SORT } from "./actionTypes";

export interface IgetFeederGraph {
    type: typeof GET_GRAPH_FEEDER;
    payload: {
        data:{
            regional?:number,
            witel?:number,
            datel?:number,
            sto?:number
        },
        token:string
    }
  }
export type ChangeOdcPageData = {
    page:number,
    rowsPerPage:string | number, 
    region:string | number,
    witel:string | number,
    datel:string | number,
    sto:string | number,
    sortBy:string | number,
    sortOrder:string,
    name: string,
}
export type GetDashCardData = {
    region:string | number,
    witel:string | number,
    datel:string | number,
    sto:string | number
}
export interface IgetDashCard{
    type: typeof GET_DASHBOARD_CARD,
    payload: {
        data:GetDashCardData,
        token:string,
        toast:any
    }
}
export interface IchangeODCPage {
    type: typeof GET_ODC_PAGE,
    payload: {
        data:ChangeOdcPageData,
        token:string,
        toast:any
    }
}
export interface IgetDistributionGraph {
    type: typeof GET_GRAPH_DISTRIBUTION;
    payload: {
        data:{
            regional?:number,
            witel?:number,
            datel?:number,
            sto?:number
        },
        token:string
    }
  }
export type SetSelectedCoreFeederData = {
    odcId:string,
    type:string,
    feeder_index:number,
    setFeederFocus:any,
    feeder_id:number,
    splitter_id:number,
    distribution_ids:Array<{
        po_index?:string,
        name?:string,
        distribution_id?: string
    }>,
}
export interface IsetSelectedCoreFeeder {
    type: typeof SET_SELECTED_CORE_FEEDER;
    payload: {
        data:SetSelectedCoreFeederData,
        handleClose:any,
        token:string,
        setSubmitting:any,
        toast:any,
        history:any
    }
  }
export type FeederDetail = {
    feeder_id: string, 
    feeder_index: number, 
    feeder_level: number
}
export interface IdeleteSelectedCoreFeeder {
    type: typeof DELETE_SELECTED_CORE_FEEDER;
    payload: {
        odcId:string,
        feeder:FeederDetail,
        setFeeder:any,
        handleClose:any,
        token:string,
        setSubmitting:any,
        toast:any,
        history:any
    }
  }
export interface IgetOcdSplitpanelStatus {
    type: typeof GET_ODC_SPLITPANEL_STATUS,
    payload:{
        odcId:string,
        token:string,
        toast:any
    }
}
export interface IgetPublicViewODC {
    type: typeof GET_PUBLIC_ODC_DETAIL,
    payload: {
        odcId: string,
        toast: any
    }
}
export interface IgetOcdSplitpanelDetail {
    type: typeof GET_ODC_SPLITPANEL_DETAIL,
    payload: {
        odcId:string,
        token:string,
        toast:any
    }
}
export interface IgetRegionList {
    type: typeof GET_REGION_LIST,
    payload: {
        token:string
    }
}
export interface IgetWitelList {
    type: typeof GET_WITEL_LIST,
    payload: {
        token:string
    }
}
export interface IgetDatelList {
    type: typeof GET_DATEL_LIST,
    payload: {
        token:string
    }
}
export interface IgetSTOList {
    type: typeof GET_STO_LIST,
    payload: {
        token:string
    }
}
export interface IgetMerekList {
    type: typeof GET_MEREK_LIST,
    payload: {
        token:string,
        toast:any
    }
}
export interface IsetTableRowsPerPage {
    type: typeof SET_ROWS_PER_PAGE,
    payload:{
        value:number
    }
}
export interface IsetTablePage {
    type: typeof SET_TABEL_PAGE,
    payload:{
        value:number
    }
}
export interface IsetTableSort {
    type: typeof SET_TABEL_SORT,
    payload:{
        value:number
    }
}
export interface IaddODCData {
    type: typeof ADD_ODC_DATA,
    payload: {
        name:string,
        merek_id: string,
        port_feeder_terminasi:string,
        deployment_date:string,
        capacity:string,
        notes:string,
        panel_oa:string,
        rak_oa:string,
        port:string,
        odc_code:string,
        region_id:string,
        witel_id:string,
        datel_id:string,
        sto_id:string,
        token: string,
        setSubmitting:any,
        handleClose:any,
        toast:any,
        rowsPerPage:number
    }
}
export interface IdeleteODCData {
    type: typeof DELETE_ODC_DATA,
    payload: {
        odc_name:string,
        odc_id:string,
        page:number,
        rowsPerPage: number,
        sort:{
            sortBy:string,
            sortOrder:string,
        }
        token:string,
        deleteRowHandleClose:any,
        toast:any}
}
export interface IupdateODCData {
    type: typeof UPDATE_ODC_DATA,
    payload: {
        name:string,
        deployment_date:string,
        notes:string,
        panel_oa:string,
        rak_oa:string,
        port:string,
        odc_code:string,
        region_id:string,
        witel_id:string,
        datel_id:string,
        sto_id:string,
        odc_id:string,
        token:string,
        setSubmitting:any,
        handleClose:any,
        toast:any,
        page:number,
        rowsPerPage:any,
        sort:{
            sortBy:string,
            sortOrder:string,
        }
    }
}
export interface IupsertODCFile {
    type: typeof UPSERT_ODC_FILE,
    payload: {
        name:string,
        odc_id:string,
        token:string,
        toast:any,kml?:File,setKml:any,mc?:File,setMc:any}
}
export interface IupdateNotes {
    type: typeof UPDATE_NOTES,
    payload: {
        notes:string,
        odcId:string,
        token:string,
        toast:any
    }
}
export interface IupdateODCPort {
    type: typeof UPDATE_ODC_PORT,
    payload: {
        odcId:string,
        field_id:string,
        table_name:string,
        value:string,
        token:string,
        toast:any
    }
}
export interface IgetActivityLog {
    type: typeof GET_ACTIVITYLOG,
    payload: {
        odcId:string,
        page:number,
        rowsPerPage:number,
        sortBy:string,
        sortOrder:string,
        token:string,
        email: string
    }
}
