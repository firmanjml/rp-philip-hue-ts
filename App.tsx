import React, { useState } from 'react';
import SwitchNavigation from './src/navigation/SwitchNavigation';
import { Provider } from 'react-redux';
import { reduxStore, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default function App() {
  const [isReady, setisReady] = useState(false)

  async function loadFontAsync() {
    await Font.loadAsync({
      'googlesans-bold': require('./assets/fonts/GoogleSans-Bold.ttf'),
      'googlesans-regular': require('./assets/fonts/GoogleSans-Regular.ttf'),
      'googlesans-medium': require('./assets/fonts/GoogleSans-Medium.ttf')
    });
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFontAsync}
        onFinish={() => setisReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={reduxStore} >
      <PersistGate loading={null} persistor={persistor}>
        <SwitchNavigation />
      </PersistGate>
    </Provider >
  );
}



