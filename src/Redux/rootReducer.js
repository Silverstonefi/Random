import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonReducer from "./commonReducer";
import authReducer from "./authReducer";

const persistConfig = {
  // at what point in our reducer do we want to start storing
  key: "root",
  storage,
  whitelist: ["common", "auth"],
};

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
});
export default persistReducer(persistConfig, rootReducer, authReducer);
