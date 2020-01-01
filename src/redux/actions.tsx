import C from './constants';
import axios from 'axios';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { ConfigurationTypes, CreateUserType, BridgePairedType } from '../types';

export const ChangeLoading = (visibility: boolean) => ({
    type: C.CHANGE_LOADING,
    payload: visibility
});

export const SearchBridgeLoading = (visibility: boolean) => ({
    type: C.SEARCH_BRIDGE_LOADING,
    payload: visibility
});

export const SearchBridge = async (dispatch) => {
    dispatch(SearchBridgeLoading(true));
    const response = await axios({
        url: 'https://discovery.meethue.com/',
        method: 'GET'
    });
    dispatch({
        type: C.SEARCH_BRIDGE,
        payload: response.data
    });
    dispatch({
        type: C.SEARCH_BRIDGE_COMPLETE,
        payload: true
    });
    dispatch(SearchBridgeLoading(false));
}

export const ClearBridge = () => (dispatch) => {
    dispatch({
        type: C.SEARCH_BRIDGE_CLEAR
    });
    dispatch({
        type: C.SEARCH_BRIDGE_COMPLETE,
        payload: false
    });
}

export const ManualSearchBridge = (bridge_ip: string, navigate: any) => async (dispatch) => {
    try {
        dispatch(SearchBridgeLoading(true));
        const response = await axios({
            url: `http://${bridge_ip}/api/nouser/config`,
            method: 'GET'
        });
        const config: ConfigurationTypes = response.data;

        if (config.modelid === "BSB001") {
            dispatch({
                type: C.PAIRING_BRIDGE,
                payload: {
                    ip: config.ipaddress,
                    id: config.bridgeid
                }
            });
            navigate('PairBridge');
        } else {
            Alert.alert(
                "Unsupported Bridge",
                "Use Bridge V1 only",
                [
                    {
                        text: "OK",
                        style: 'default'
                    }
                ],
                { cancelable: false }
            );
        }
    } catch (e) {
        Alert.alert(
            "Timeout Error",
            "Couldn't retrieve information from the IP",
            [
                {
                    text: "OK",
                    style: 'default'
                }
            ],
            { cancelable: false }
        );
    } finally {
        dispatch(SearchBridgeLoading(false));
    }
}

export const PairBridge = () => async (dispatch, getState) => {
    const bridgeip = getState().pairing_bridge.ip;

    const response = await axios({
        url: `http://${bridgeip}/api`,
        method: 'POST',
        data: {
            devicetype: `Lighue#${Constants.deviceName}`
        } 
    });

    const user: CreateUserType = response.data[0];

    if (response && user.success) {
        const result = await axios({
            url: `http://${bridgeip}/api/nouser/config`,
            method: 'GET'
        });

        const config: ConfigurationTypes = result.data;
        config['username'] = user.success.username;

        dispatch({
            type: C.ADD_BRIDGE,
            payload: config
        });
    }
}

export const GetRoomList = () => async (dispatch, getState) => {
    const state = getState();
    const { id }: BridgePairedType = state.pairing_bridge;
    const bridge: ConfigurationTypes = state.bridge_list[id];
    
    dispatch(ChangeLoading(true));
    const response = await axios({
        url: `http://${bridge.ipaddress}/api/${bridge.username}/groups`,
        method: 'GET'
    });

    if (response && response.data) {
        dispatch({
            type: C.FETCH_ALL_GROUPS,
            payload: response.data
        })
    }

    dispatch(ChangeLoading(false));
}

export const GetLightList = () => async (dispatch, getState) => {
    const state = getState();
    const { id }: BridgePairedType = state.pairing_bridge;
    const bridge: ConfigurationTypes = state.bridge_list[id];
    
    dispatch(ChangeLoading(true));
    const response = await axios({
        url: `http://${bridge.ipaddress}/api/${bridge.username}/lights`,
        method: 'GET'
    });
    if (response && response.data) {
        dispatch({
            type: C.FETCH_ALL_LIGHTS,
            payload: response.data
        })
    }
    dispatch(ChangeLoading(false));
}