import storage from "redux-persist/lib/storage"
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from "redux-persist"

import userSlice from "../slice/userSlice"
import adminSlice from "../slice/adminSlice"
import ownerSlice from "../slice/ownerSlice"
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    user: userSlice,
    admin: adminSlice,
    owner: ownerSlice,
  });

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["user", "admin", "owner"]
}

const persistedReduce = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReduce,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE ]
        }
    })
})


export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
