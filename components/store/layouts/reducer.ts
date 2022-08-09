import { CHANGE_PAGE_TO, CHANGE_PAGE_TO_SUCCESSFUL } from "./actionTypes";

const INIT_STATE = {
    goto:"/odc",
    page_loading: false
}

const layout = (state=INIT_STATE,action) =>{
    switch (action.type) {
        case CHANGE_PAGE_TO:
            // console.log("reducer change page to")
            return {
                ...state,
                page_loading: state.goto != action.payload ? true: false,
            };
        case CHANGE_PAGE_TO_SUCCESSFUL:
            // console.log("refetch successful",action.payload,location.pathname)
            return {
                ...state,
                page_loading: action.payload == location.pathname ? false:true,
                goto: action.payload,
            };
    
        default:
            return state;
    }
}
export default layout