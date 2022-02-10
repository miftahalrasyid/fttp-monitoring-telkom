import { combineReducers } from "redux";
import ODCs from "./odcs/reducer";


const rootReducer = combineReducers({
    ODCs,
});

export default rootReducer;