import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Block, Text, ToggleSwitch, Input, Button } from '../../components';
import { theme } from '../../constants';

function BridgeInfo() {
    const config = {
        "name": "Philips hue",
        "zigbeechannel": 15,
        "mac": "00:17:88:00:00:00",
        "dhcp": true,
        "ipaddress": "192.168.1.7",
        "netmask": "255.255.255.0",
        "gateway": "192.168.1.1",
        "proxyaddress": "none",
        "proxyport": 0,
        "UTC": "2014-07-17T09:27:35",
        "localtime": "2014-07-17T11:27:35",
        "timezone": "Europe/Madrid",
        "whitelist": {
            "ffffffffe0341b1b376a2389376a2389": {
                "last use date": "2014-07-17T07:21:38",
                "create date": "2014-04-08T08:55:10",
                "name": "PhilipsHueAndroidApp#TCT ALCATEL ONE TOU"
            },
            "pAtwdCV8NZId25Gk": {
                "last use date": "2014-05-07T18:28:29",
                "create date": "2014-04-09T17:29:16",
                "name": "MyApplication"
            },
            "gDN3IaPYSYNPWa2H": {
                "last use date": "2014-05-07T09:15:21",
                "create date": "2014-05-07T09:14:38",
                "name": "iPhone Web 1"
            }
        },
        "swversion": "01012917",
        "apiversion": "1.3.0",
        "swupdate": {
            "updatestate": 0,
            "url": "",
            "text": "",
            "notify": false
        },
        "linkbutton": false,
        "portalservices": false,
        "portalconnection": "connected",
        "portalstate": {
            "signedon": true,
            "incoming": false,
            "outgoing": true,
            "communication": "disconnected"
        }
    }

    return (
        <Block style={styles.container}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 googlebold>{config.name}</Text>
            </Block>
            <Text gray style={{marginTop : 10}}>Bridge Information</Text>
            <ScrollView>
                <Block flex={false} column>
                    <Text gray googlebold style={styles.textSetting}>Connection</Text>
                    <Text style={styles.textSetting}>Status : Connected</Text>
                    <Text style={styles.textSetting}>Portal Services : {config.portalservices ? "Connected through Cloud" : "Not using cloud"}</Text>
                    <Text style={styles.textSetting}>ZigBee Channel : {config.zigbeechannel}</Text>
                </Block>
                <Block flex={false} column style={styles.row}>
                    <Text gray googlebold style={styles.textSetting}>Software</Text>
                    <Text style={styles.textSetting}>Software Version : {config.swversion}</Text>
                    <Text style={styles.textSetting}>API Version : {config.apiversion}</Text>
                </Block>
                <Block flex={false} column style={styles.row}>
                    <Text gray googlebold style={styles.textSetting}>Network</Text>
                    <Text style={styles.textSetting}>IP Address : {config.ipaddress}</Text>
                    <Text style={styles.textSetting}>MAC Address : {config.mac}</Text>
                    <Text style={styles.textSetting}>Gateway : {config.gateway}</Text>
                    <Text style={styles.textSetting}>DHCP : {config.dhcp ? "Use assigned IP by DHCP Server" : "Static IP"}</Text>
                    <Text style={styles.textSetting}>Proxy Address : {config.proxyaddress === "none" ? "None" : config.proxyaddress}</Text>
                    <Text style={styles.textSetting}>Proxy Port : {config.proxyport}</Text>
                </Block>
                <Block flex={false} column style={[styles.row, {marginBottom : 20}]}>
                    <Text gray googlebold style={styles.textSetting}>Time</Text>
                    <Text style={styles.textSetting}>Local Time : {config.localtime}</Text>
                    <Text style={styles.textSetting}>Timezone : {config.timezone}</Text>
                    <Text style={styles.textSetting}>UTC : {config.UTC}</Text>
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

export default BridgeInfo;