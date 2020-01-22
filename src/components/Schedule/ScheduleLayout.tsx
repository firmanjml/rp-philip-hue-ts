import React, { useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, } from "react-native";
import { Block, Text } from '../../components';
import { ScheduleTypes } from "../../../src/hueapi/types";
import { useNavigation } from 'react-navigation-hooks';
import ToggleSwitch from "../ToggleSwitch";
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ColorizeRows } from '../../utils';

interface ScheduleLayoutProps {
    schedule: ScheduleTypes;
    theme: any;
    styles: any;
}
function ScheduleLayout({
    schedule,
    theme,
    styles
}: ScheduleLayoutProps) {
    const { navigate } = useNavigation();

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
            "status": "disabled",
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
        Object.entries(schedules).length === 0 && schedules.constructor === Object ?
            <Block style={{ paddingHorizontal: theme.sizes.base * 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text h1 bold>No schedules created.</Text>
                <TouchableOpacity
                    onPress={() => console.log("ad")}>
                    <Text h2 style={{ marginTop: 5, color: '#20D29B' }}>Add schedules</Text>
                </TouchableOpacity>
            </Block>
            :
            <FlatList
                keyExtractor={(item) => item}
                data={Object.keys(schedules)}
                renderItem={({ item: key }) => (
                    <View style={{ paddingHorizontal: theme.sizes.base * 2 }}>
                        <TouchableOpacity onPress={() => navigate('ScheduleInfo', { scheduleID: key })}>
                            <View style={{
                                backgroundColor: ColorizeRows.colorizeRow(),
                                paddingBottom: 20,
                                paddingTop: 20,
                                marginBottom: 20,
                                borderRadius: 10
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
                                    <Text googlebold style={[{ fontSize: 21, alignSelf: 'center' }]}>{`${schedules[key].name}`}</Text>
                                    <ToggleSwitch
                                        offColor="#DDDDDD"
                                        onColor={theme.colors.secondary}
                                        onToggle={() => console.log("haloo")}
                                        isOn={schedules[key].status}
                                    />
                                </View>
                                <Text style={[{ fontSize: 15, marginLeft: 20, marginTop: 10 }]}>{`${schedules[key].description}`}</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                                    <Ionicons name="ios-alarm" size={20} color="white"></Ionicons>
                                    <Text googlemedium style={[{ fontSize: 15, marginLeft: 10 }]}>{`${schedules[key].time}`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
    )
}

export default ScheduleLayout;