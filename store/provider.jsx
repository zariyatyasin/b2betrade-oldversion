"use client";

import { persistStore } from "redux-persist";
import store from "./index";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
