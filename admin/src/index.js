import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from 'store';

import { SnackbarProvider } from "notistack";

export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <SnackbarProvider 
            maxSnack={1}
            anchorOrigin={{ vertical: "top", horizontal: "center"}}
            autoHideDuration={2000}
            disableWindowBlurListener={true}
          >
            <App />
          </SnackbarProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
