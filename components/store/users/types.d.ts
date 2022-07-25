type GetUserData = {
    rowsPerPage:number, 
    page:number,
    sortBy:string,
    sortOrder:string,
    email: string,
}
export interface IgetUserData {
    type: string,
    payload: {
        data: GetUserData,
        token:string,
        errorState:any,
        toast:any
    }
}
export interface IaddUserData {
    type: string,
    payload:{
        email:string,
        password:string,
        role:string,
        token:string,
        rowsPerPage:string,
        setSubmitting:any,
        handleAddUserClose:any,
        toast:any
    }
}
export interface IdeleteUserData {
    type: string,
    payload:{
        email:string,
        idx:number,
        user_id:string,
        token:string,
        page:number,
        rowsPerPage:number,
        sort:{
            sortBy:string,
            sortOrder:string,
        }
        setSubmitting:any,
        deleteRowHandleClose: any,
        toast:any
    }
}
export interface IupdateUserData {
    type: string,
    payload:{
        email:string,
        idx:number,
        password:string,
        role:string,
        status:string,
        user_id:string,
        token:string,
        page:number,
        rowsPerPage:number,
        sort:{
            sortBy:string,
            sortOrder:string,
        }
        setSubmitting:any,
        handleClose: any,
        toast:any
    }
}
export interface IsetTableRowsPerPage {
    type: typeof SET_ROWS_PER_PAGE,
    payload:{
        value:number
    }
}