import React from 'react';
import SwitchNavigation from './src/navigation/SwitchNavigation';
import { Provider } from 'react-redux';
import { reduxStore, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <SwitchNavigation />
      </PersistGate>
    </Provider>
  );
}