import thunk from 'redux-thunk';
import reducer from './reducers';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistorConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistorConfig, reducer);

export const reduxStore = createStore(
    pReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(reduxStore);