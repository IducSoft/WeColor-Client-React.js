import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import paletteReducer from "./paletteSlice";
import darkModeReducer from "./darkModeSlice";
import explorePalettesReducer from "./resultPalettesFromExploreSlice";
import profileDataUserSlice from "./profileDataUserSlice";
import PaletteToPdfSliceReducer from "./PaletteToPdfSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  palette: paletteReducer,
  darkmode: darkModeReducer,
  explorePalettes: explorePalettesReducer,
  profileDataUser:profileDataUserSlice,
  paletteForPdf: PaletteToPdfSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
