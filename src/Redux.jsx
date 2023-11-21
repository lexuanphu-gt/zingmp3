import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/RootReducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
export default reduxConfig;
