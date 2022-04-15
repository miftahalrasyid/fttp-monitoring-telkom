import { combineReducers } from "redux";
import ODCs from "./odcs/reducer";
import Auth from "./auth/reducer";
import Users from "./users/reducer";


const rootReducer = combineReducers({
    ODCs,
    Auth,
    Users
});

export default rootReducer;