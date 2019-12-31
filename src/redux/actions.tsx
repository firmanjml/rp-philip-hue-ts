import C from './constants';
import axios from 'axios';
import { Alert } from 'react-native';

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

export const ManualSearchBridge = (bridge_ip: string) => async (dispatch) => {
    
    try {
        dispatch(SearchBridgeLoading(true));
        const response = await axios({
            url: `http://${bridge_ip}/api/nouser/config`,
            method: 'GET'
        });
        if (response.data.modelid === "BSB001") {
            dispatch({
                type: C.PAIRING_BRIDGE,
                payload: bridge_ip
            });
            console.log('navigate')
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

