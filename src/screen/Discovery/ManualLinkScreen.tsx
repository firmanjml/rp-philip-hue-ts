import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Block, Button, Text, Input } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants';
import Layout from '../../constants/Layout';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useNavigation } from 'react-navigation-hooks';
import { ManualSearchBridge } from '../../redux/actions';

function ManualLinkScreen() {
    const dispatch = useDispatch();
    const searchBridge = useCallback((ip: string) => dispatch(ManualSearchBridge(ip)), [dispatch]);
    const night_mode = useSelector(state => state.night_mode);
    const loading = useSelector(state => state.search_bridge_loading);

    const { colors } = theme;

    const backgroundcolor = { backgroundColor: night_mode ? colors.background : colors.backgroundLight };
    const textcolor = { color: night_mode ? colors.white : colors.black }
    const titlecolor = { color: night_mode ? colors.white : colors.black }
    const bordercolor = { borderColor: night_mode ? colors.white : colors.black }
    const placeholdercolor = night_mode ? colors.gray2 : colors.gray3;

    const [checking, setChecking] = useState(false);
    const [ipStr, setIpStr] = useState("");

    const { navigate } = useNavigation();

    return (
        <Block style={backgroundcolor} >
            <Block container>
                <Block flex={false} row space="between">
                    <Text h1 center bold style={[{ textAlign: 'left' }, titlecolor]}>Find Hue Bridge</Text>
                    {/* {this.renderMenu()} */}
                </Block>
                <Text paragraph style={[{ marginTop: 20 }, textcolor]}>
                    Make sure the Hue bridge is powered on and connected to the router of your current Wi-Fi. Then, tap search below.
                    </Text>
                <Block margin={[30, 0, 0, 0]} center>
                    <Image
                        source={require('../../../assets/images/router.png')}
                        resizeMode='contain'
                        style={{ width: Layout.window.width, height: Layout.window.height / 5, }}
                    />
                </Block>
                <Block margin={[30, 0, 0, 0]}>
                    <Text paragraph style={titlecolor}>
                        Manual IP
                        </Text>
                    <Input
                        style={[styles.textInput, textcolor, bordercolor]}
                        keyboardType="numeric"
                        value={ipStr}
                        onChangeText={(value) => setIpStr(value)}
                        placeholder={'192.168.1.1'}
                        placeholderTextColor={placeholdercolor}
                        returnKeyType={'done'}
                    />
                    <Text paragraph style={[textcolor, { marginTop: 10 }]}>
                        Advanced. You can also enter IP address above before starting the search.
                        </Text>
                </Block>
                <Block middle flex={1}>
                    <Button gradient
                        startColor='#0A7CC4'
                        endColor='#2BDACD'
                        onPress={() => {
                            if (ipStr.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
                                searchBridge(ipStr);
                            } else {
                                Alert.alert(
                                    'Invalid IP Format',
                                    'Please re-enter IP address',
                                    [
                                        {
                                            text: "OK",
                                            style: 'default'
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }
                        }}>
                        <Text center semibold white>{loading ? 'Searching...' : 'Search'}</Text>
                    </Button>
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={() => navigate('Tutorial')}>
                        <Text style={[{ textAlign: 'center' }, textcolor]}>Having trouble finding out Bridge IP?</Text>
                    </TouchableOpacity>
                </Block>
            </Block>
            <KeyboardSpacer />
        </Block>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 25,
        borderBottomWidth: .5,
        borderRadius: 0,
        borderWidth: 0,
        textAlign: 'left',
        paddingBottom: 10
    }
});

export default ManualLinkScreen;