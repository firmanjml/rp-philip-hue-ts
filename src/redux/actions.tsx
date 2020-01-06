import C from './constants';
import axios from 'axios';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { ConfigurationTypes, CreateUserType, BridgePairedType, LightTypes, LightUpdateStates } from '../hueapi/types';
import hue from '../hueapi';

export const ChangeLoading = (visibility: boolean) => ({
    type: C.CHANGE_LOADING,
    payload: visibility
});

export const SearchBridgeLoading = (visibility: boolean) => ({
    type: C.SEARCH_BRIDGE_LOADING,
    payload: visibility
});

export const SearchBridge = () => async (dispatch) => {
    try {
        dispatch(SearchBridgeLoading(true));
        const response = await hue.discover();
        dispatch({
            type: C.SEARCH_BRIDGE,
            payload: response
        });
        dispatch({
            type: C.SEARCH_BRIDGE_COMPLETE,
            payload: true
        });
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(SearchBridgeLoading(false));
    }
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

export const ManualSearchBridge = (ip: string, navigate: any) => async (dispatch) => {
    try {
        dispatch(SearchBridgeLoading(true));
        const config = await hue.bridge(ip).user('nouser').getConfig();

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
        console.log(e)
    } finally {
        dispatch(SearchBridgeLoading(false));
    }
}

export const PairBridge = () => async (dispatch, getState) => {
    const bridgeip = getState().pairing_bridge.ip;
    var bridge = await hue.bridge(bridgeip);

    try {
        const username = (await bridge.createUser(`Lighue#${Constants.deviceName}`))[0].success.username;
        if (username) {
            const config = await bridge.user(username).getConfig();
            config.username = username;
            dispatch({
                type: C.ADD_BRIDGE,
                payload: config
            });
        }
    } catch (e) {
        console.log(e);
    } finally {

    }
}

export const GetRoomList = () => async (dispatch, getState) => {
    const state = getState();
    const { id }: BridgePairedType = state.pairing_bridge;
    const bridge: ConfigurationTypes = state.bridge_list[id];

    dispatch(ChangeLoading(true));

    try {
        const response = await hue.bridge(bridge.ipaddress).user(bridge.username).getGroups();

        if (response) {
            dispatch({
                type: C.FETCH_ALL_GROUPS,
                payload: response
            });
        }

    } catch (e) {
        console.log(e);
    } finally {
        dispatch(ChangeLoading(false));
    }
}

export const GetLightList = () => async (dispatch, getState) => {
    const state = getState();
    const { id }: BridgePairedType = state.pairing_bridge;
    const bridge: ConfigurationTypes = state.bridge_list[id];

    dispatch(ChangeLoading(true));

    const response = await hue.bridge(bridge.ipaddress).user(bridge.username).getLights();

    if (response) {
        dispatch({
            type: C.FETCH_ALL_LIGHTS,
            payload: response
        })
    }
    dispatch(ChangeLoading(false));
}

export const UpdateLightState = (key: string, data: object) => async (dispatch, getState) => {
    const state = getState();

    const { id }: BridgePairedType = state.pairing_bridge;
    const bridge: ConfigurationTypes = state.bridge_list[id];

    const response = await hue.bridge(bridge.ipaddress).user(bridge.username).setLightState(key, data);

    if (response) {
        var payload = {};
        response.map((data) => {
            let key = Object.keys(data.success)[0].substring(Object.keys(data.success)[0].lastIndexOf('/') + 1);
            let value = Object.values(data.success)[0];
            payload[key] = value;
        })
        dispatch({
            type: C.CHANGE_LIGHT_STATE,
            id: key,
            payload: payload
        })
    }
}