import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import Block from '../Block';
import { ConfigurationTypes } from '../../types';

interface BridgeInfoProps {
    textcolor: any;
    theme: any;
    bridge: ConfigurationTypes;
}
function BridgeInfo({
    textcolor,
    theme,
    bridge
}: BridgeInfoProps) {
    const [infoState, setInfoState] = useState(0);
    
    return (
        <Block flex={false} style={{ paddingHorizontal: theme.sizes.base * 2 }}>
            <TouchableOpacity onPress={() => setInfoState(state => (state === 4) ? state = 0 : state + 1)}>
                <Text style={[textcolor]}>Info: {infoState === 0 ? bridge.name : infoState === 1 ? bridge.ipaddress : infoState === 2 ? bridge.bridgeid : infoState === 3 ? bridge.modelid : bridge.username.substring(0, 16)}</Text>
            </TouchableOpacity>
        </Block>
    )
}

export default BridgeInfo;