import React, { useEffect } from 'react';
import {
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from 'react-navigation-hooks';
import { BridgePairedType } from '../hueapi/types';

function AuthNavigation() {
    let paired: BridgePairedType = useSelector(state => state.pairing_bridge);
    const bridge = useSelector(state => state.bridge_list);
    const { navigate } = useNavigation();

    useEffect(() => {
        if (!bridge[paired.id]) {
            navigate('Discovery')
        } else {
            navigate('App')
        }
    });

    return (
        <View></View>
    )
}

export default AuthNavigation;