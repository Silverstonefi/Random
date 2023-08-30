import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";

const logger = createLogger();
const store = createStore(rootReducer);
const persistor = persistStore(store);
export { store, persistor };
