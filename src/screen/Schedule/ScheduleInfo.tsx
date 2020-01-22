import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Block, Text, ToggleSwitch } from '../../components';
import { theme } from '../../constants';
import { useNavigationParam } from 'react-navigation-hooks';
import { Ionicons } from '@expo/vector-icons'

function ScheduleInfo() {
    const key = useNavigationParam('scheduleID');

    const schedules = {
        "1": {
            "name": "Timer nak berak",
            "description": "I want to berak",
            "command": {
                "address": "/api/s95jtYH8HUVWNkCO/groups/0/action",
                "body": {
                    "scene": "02b12e930-off-0"
                },
                "method": "PUT"
            },
            "time": "PT00:01:00",
            "created": "2014-06-23T13:39:16",
            "status": "enabled",
            "autodelete": false,
            "starttime": "2014-06-23T13:39:16"
        },
        "2": {
            "name": "Iman's Alarm",
            "description": "Wake Iman ass up",
            "command": {
                "address": "/api/s95jtYH8HUVWNkCO/groups/0/action",
                "body": {
                    "scene": "02b12e930-off-0"
                },
                "method": "PUT"
            },
            "localtime": "2014-06-23T19:52:00",
            "time": "2014-06-23T13:52:00",
            "created": "2014-06-23T13:38:57",
            "status": "disabled",
            "autodelete": false
        },
        "3": {
            "name": "Naga's Alarm",
            "description": "Time to goncang",
            "command": {
                "address": "/api/s95jtYH8HUVWNkCO/groups/0/action",
                "body": {
                    "scene": "02b12e930-off-0"
                },
                "method": "PUT"
            },
            "localtime": "2014-06-23T19:52:00",
            "time": "2014-06-23T13:52:00",
            "created": "2014-06-23T13:38:57",
            "status": "disabled",
            "autodelete": false
        },
        "4": {
            "name": "House Alarm ",
            "description": "Wake everyone up for subuh. ",
            "command": {
                "address": "/api/s95jtYH8HUVWNkCO/groups/0/action",
                "body": {
                    "scene": "02b12e930-off-0"
                },
                "method": "PUT"
            },
            "localtime": "2014-06-23T19:52:00",
            "time": "2014-06-23T13:52:00",
            "created": "2014-06-23T13:38:57",
            "status": "disabled",
            "autodelete": false
        },
        "5": {
            "name": "Alarm",
            "description": "",
            "command": {
                "address": "/api/s95jtYH8HUVWNkCO/groups/0/action",
                "body": {
                    "scene": "02b12e930-off-0"
                },
                "method": "PUT"
            },
            "localtime": "2014-06-23T19:52:00",
            "time": "2014-06-23T13:52:00",
            "created": "2014-06-23T13:38:57",
            "status": "disabled",
            "autodelete": false
        },
        "6": {
            "name": "Alarm",
            "description": "",
            "command": {
                "address": "/api/s95jtYH8HUVWNkCO/groups/0/action",
                "body": {
                    "scene": "02b12e930-off-0"
                },
                "method": "PUT"
            },
            "localtime": "2014-06-23T19:52:00",
            "time": "2014-06-23T13:52:00",
            "created": "2014-06-23T13:38:57",
            "status": "disabled",
            "autodelete": false
        }
    }

    return (
        <Block style={styles.container}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 googlebold>{schedules[key].name}</Text>
                <ToggleSwitch
                    offColor="#DDDDDD"
                    onColor={theme.colors.secondary}
                    onToggle={() => console.log("blah")}
                    isOn={true}
                />
            </Block>
            <Block flex={false} center row style={{ marginTop: 15 }}>
                <Ionicons name="ios-alarm" size={20} color="white"></Ionicons>
                <Text h2 gray googlemedium style={{ marginLeft: 10 }}>{schedules[key].time}</Text>
            </Block>
            <Block flex={false} column style={styles.row}>
                <Text gray googlebold style={styles.textSetting}>Status</Text>
                <Text style={styles.textSetting}>{schedules[key].status.charAt(0).toUpperCase() + schedules[key].status.substring(1)}</Text>
            </Block>
            <Block flex={false} column style={styles.row}>
                <Text gray googlebold style={styles.textSetting}>Description</Text>
                <Text style={styles.textSetting}>{schedules[key].description}</Text>
            </Block>
            <Block flex={false} column style={styles.row}>
                <Text gray googlebold style={styles.textSetting}>Action</Text>
                <Text style={styles.textSetting}>{schedules[key].command.address}</Text>
            </Block>
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


export default ScheduleInfo;