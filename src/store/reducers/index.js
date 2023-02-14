import { combineReducers } from "redux";
import authInfo from "./authInfo";
import isLoggined from "./isAuthenticated";
import admins from "./admins";
import isAdmin from "./isAdmin";
import cartItems from "./cart"

const reducers = combineReducers({
  myAuth: authInfo,
  isAuthLoggined: isLoggined,
  myAdmins: admins,
  isAdminLoggined: isAdmin,
  cartItems: cartItems
});

export default reducers;
