import { combineReducers } from "redux";
import ODCs from "./odcs/reducer";
import Login from "./login/reducer";


const rootReducer = combineReducers({
    ODCs,
    Login
});

export default rootReducer;