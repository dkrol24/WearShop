import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import productsReducer from "./Products/productsReducer";
export default combineReducers({
    user: userReducer,
    productsData: productsReducer
});