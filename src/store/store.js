import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import userReducer from "./userProfile";

const combinedReducer = combineReducers({
  user: userReducer,
});
const rootReducer = (state, action) => {
    if (action.type === "counter/logout") {
      state = undefined;
    }
    return combinedReducer(state, action);
  };
  
  export default configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
  });
  