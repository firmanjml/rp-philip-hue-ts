import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Block, Text, ToggleSwitch, Input, Button } from '../../components';
import { theme } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';

function SettingList() {

    const { navigate } = useNavigation();
    return (
        <Block style={styles.container}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 googlebold>Settings</Text>
            </Block>
            <ScrollView>
                <Block flex={false} column style={styles.row}>
                    <Text gray googlebold style={styles.textSetting}>Bridge Configuration</Text>
                    <Text style={styles.textSetting}>Add new bridge v1</Text>
                    <Text style={styles.textSetting}>Setup Remote Control via Cloud</Text>
                    <TouchableOpacity onPress={() => navigate('BridgeInfo')}>
                        <Text style={styles.textSetting}>Bridge Information</Text>
                    </TouchableOpacity>
                </Block>
                <Block flex={false} column style={styles.row}>
                    <Text gray googlebold style={styles.textSetting}>LigHue</Text>
                    <Text style={styles.textSetting}>Fingerprint</Text>
                    <Text style={styles.textSetting}>Dark Mode</Text>
                </Block>
                <Block flex={false} column style={styles.row}>
                    <Text style={{ color: 'red', fontSize: 16 }}>Log Out</Text>
                </Block>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: theme.colors.background
    },
    textSetting: {
        marginTop: 18,
        fontSize: 16
    },
    header: {
        marginTop: 25
    },
    row: {
        marginTop: 20,
    },
    divider: {
        marginTop: 15,
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 0.5,
        borderColor: "#E1E3E8"
    }
});

export default SettingList;