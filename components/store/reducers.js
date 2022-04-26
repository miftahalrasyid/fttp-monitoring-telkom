import { combineReducers } from "redux";
import ODCs from "./odcs/reducer";
import Login from "./login/reducer";
import Users from "./users/reducer";


const rootReducer = combineReducers({
    ODCs,
    Login,
    Users
});

export default rootReducer;