import { combineReducers } from "redux";
import userResolver from "./user/user.reducer";

export default combineReducers({
  user: userResolver
});
