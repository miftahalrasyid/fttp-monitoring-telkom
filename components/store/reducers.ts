import { combineReducers } from "redux";
import ODCs from "./odcs/reducer";
import Auth from "./auth/reducer";
import Users from "./users/reducer";
import Layout from "./layouts/reducer";


const rootReducer = combineReducers({
    ODCs,
    Auth,
    Users,
    Layout
});

export default rootReducer;