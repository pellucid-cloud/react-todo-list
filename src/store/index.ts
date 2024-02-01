// 组合redux子模块 + 导出store实例
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import listReducer from "@/store/modules/list";
import remindReducer from "@/store/modules/remind";
import publicReducer from "@/store/modules/public";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";

const rootReducer = combineReducers({
  list: listReducer,
  remind: remindReducer,
  public: publicReducer
})

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
