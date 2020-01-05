import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Block, Button, Text, Input } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants';
import { useNavigation } from 'react-navigation-hooks';
import Countdown from 'react-countdown-now';
import { PairBridge } from '../../redux/actions';

function BridgePairingScreen() {
    const dispatch = useDispatch();
    const pairBridge = useCallback(() => dispatch(PairBridge()), [dispatch]);
                            
    const pairing_bridge = useSelector(state => state.pairing_bridge);
    const bridge_list = useSelector(state => state.bridge_list);

    const { id } = pairing_bridge;

    const { navigate, goBack } = useNavigation();

    return (
        <Block style={styles.container} >
            <Block container>
                <Text h1 center googlebold style={{ textAlign: 'left' }}>
                    Link to Philips Hue
                    </Text>
                <Text paragraph style={{ marginTop: 20 }}>
                    To link this device with the Bridge, press the push-link button of the Hue bridge you want to connect to.
                    </Text>
                <Block style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/pushlink.png')}
                        resizeMode='contain'
                        style={{ width: 250, height: 240 }}
                    />
                </Block>
                <Block style={{ marginTop: 20 }}>
                    {<Countdown
                        date={Date.now() + 30000}
                        intervalDelay={1000}
                        renderer={({ seconds, completed}) => {
                            if (!completed) {
                                return <Text center h1 googlemedium>{seconds} seconds</Text>;
                            } else {
                                return <Text center h1 googlemedium>No device link.</Text>;
                            }
                        }}
                        onComplete={() => {
                            Alert.alert(
                                'Error',
                                'No Bridge was found.',
                                [
                                    {
                                        text: "OK",
                                        onPress: () => goBack()
                                    }
                                ],
                                { cancelable: false }
                            )
                        }}
                        onTick={() => {
                            if (!bridge_list[id]) {
                                pairBridge();
                            } else {
                                navigate('App');
                            }
                        }}
                    />}
                    <Block style={{ marginTop: 20 }}>
                        <Text paragraph>
                            You have 30 seconds to press the push-link button
                        </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : theme.colors.background
    }
});

export default BridgePairingScreen;