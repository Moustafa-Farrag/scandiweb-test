import shoppingCart from "./shoppingCart";
import generalSetting from './generalSetting';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    shoppingCart,
    generalSetting
});

export default rootReducer;