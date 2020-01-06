import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import Block from '../Block';
import { ConfigurationTypes } from '../../hueapi/types';

interface BridgeInfoProps {
    theme: any;
    bridge: ConfigurationTypes;
}
function BridgeInfo({
    theme,
    bridge
}: BridgeInfoProps) {
    const [infoState, setInfoState] = useState(0);
    
    return (
        <Block flex={false} style={{ marginTop : 5, paddingHorizontal: theme.sizes.base * 2 }}>
            <TouchableOpacity onPress={() => setInfoState(state => (state === 4) ? state = 0 : state + 1)}>
                <Text googleregular>{infoState === 0 ? `Bridge Name : ${bridge.name}` : infoState === 1 ? `IP Address : ${bridge.ipaddress}` : infoState === 2 ? `Bridge ID : ${bridge.bridgeid}` : infoState === 3 ? bridge.modelid : bridge.username.substring(0, 16)}</Text>
            </TouchableOpacity>
        </Block>
    )
}

export default BridgeInfo;