import C from './constants';
import axios from 'axios';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { ConfigurationTypes, CreateUserType, BridgePairedType, LightTypes } from '../types';

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

        if (true) {
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
                "Unsupported Bridgee",
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
            "Couldn't retrieve information from the IPee",
            [
                {
                    text: "OK",
                    style: 'default'
                }
            ],
            { cancelable: false }
        );
        console.log(e)
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

export const UpdateLightState = (lampID, jsondata) => async (dispatch, getState) => {
    const state = getState();
    const { id }: BridgePairedType = state.pairing_bridge;
    const bridge: ConfigurationTypes = state.bridge_list[id];

    const response = await axios({
        url: `http://${bridge.ipaddress}/api/${bridge.username}/lights/${lampID}/state`,
        method: 'PUT',
        data: jsondata
    });
    if (response && response.data) {
        var payload = {};
        response.data.map((data) => {
            let key = Object.keys(data.success)[0].substring(Object.keys(data.success)[0].lastIndexOf('/') + 1);
            let value = Object.values(data.success)[0];
            payload[key] = value;
        })
        dispatch({
            type: C.CHANGE_LIGHT_STATE,
            id: lampID,
            payload: payload
        })
    }
}