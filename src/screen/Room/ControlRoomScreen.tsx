import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Block, Text, ToggleSwitch, Input } from '../../components';
import { theme } from '../../constants';
import Slider from 'react-native-slider';
import { GroupTypes, LightUpdateStates } from '../../hueapi/types';
import { ColorPicker } from "react-native-color-picker";
import { UpdateLightState } from '../../redux/actions';
import { useNavigationParam } from 'react-navigation-hooks';
import { Ionicons } from '@expo/vector-icons';

function ControlRoomScreen() {
    const { colors } = theme;
    const key = useNavigationParam('roomID');

    const [controlMode, setControlMode] = useState('Whole Room');
    const mode = ['Whole Room', 'Bulb List'];

    const dispatch = useDispatch();
    /* const room: GroupTypes = useSelector(state => state.room_list); */
    const updatelight = useCallback((key: string, data: LightUpdateStates) => dispatch(UpdateLightState(key, data)), [dispatch]);
    const bordercolor = { borderColor: colors.white }

    const room = {
        "1": {
            "name": "Group 1",
            "lights": [
                "1",
                "2"
            ],
            "type": "LightGroup",
            "action": {
                "on": true,
                "bri": 254,
                "hue": 10000,
                "sat": 254,
                "effect": "none",
                "xy": [
                    0.5,
                    0.5
                ],
                "ct": 250,
                "alert": "select",
                "colormode": "ct"
            }
        },
        "2": {
            "name": "Group 2",
            "lights": [
                "3",
                "4",
                "5"
            ],
            "type": "LightGroup",
            "action": {
                "on": true,
                "bri": 153,
                "hue": 4345,
                "sat": 254,
                "effect": "none",
                "xy": [
                    0.5,
                    0.5
                ],
                "ct": 250,
                "alert": "select",
                "colormode": "ct"
            }
        }
    }

    const renderControlMode = () => {
        return (
            controlMode === 'Whole Room' ?
                <ColorPicker
                    onColorChange={() => console.log("asdasd")}
                    onColorSelected={() => console.log("sdad")}
                    defaultColor="#324545"
                    color="#123324"
                    style={{ flex: 1 }}
                    hideSliders={true}
                />
                :
                <Text>what</Text>
        )
    }

    const renderTabs = () => {
        return (
            Object.keys(mode).map(key => (
                <TouchableOpacity key={key} onPress={() => setControlMode(mode[key])}>
                    <Text>{mode[key]}</Text>
                </TouchableOpacity>
            ))
        )
    }

    return (
        <Block style={styles.container}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 googlebold>{room[key].name}</Text>
                <ToggleSwitch
                    offColor="#DDDDDD"
                    onColor={theme.colors.secondary}
                    onToggle={() => updatelight(key, { on: !room[key].action.on })}
                    isOn={room[key].action.on}
                />
            </Block>
            <Block flex={false} row style={{ marginTop: 25, marginBottom: 10 }}>
                <Ionicons name="ios-sunny" size={20} color="white"></Ionicons>
                <Text googlemedium style={[styles.textControl, { marginLeft: 10 }]}>Brightness</Text>
            </Block>
            <Slider
                minimumValue={1}
                maximumValue={254}
                style={{ height: 25 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 15, borderRadius: 10 }}
                minimumTrackTintColor={colors.secondary}
                maximumTrackTintColor={"rgba(157, 163, 180, 0.10)"}
                value={room[key].action.bri}
                onValueChange={(value) => updatelight(key, { bri: value })}
            />
            <Block flex={false} row style={styles.controlrow}>
                <Ionicons name="ios-water" size={20} color="white"></Ionicons>
                <Text googlemedium style={[styles.textControl, { marginLeft: 10 }]}>Saturation</Text>
            </Block>
            <Slider
                minimumValue={1}
                maximumValue={254}
                style={{ height: 25 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 15, borderRadius: 10 }}
                minimumTrackTintColor={colors.secondary}
                maximumTrackTintColor={"rgba(157, 163, 180, 0.10)"}
                value={room[key].action.sat}
                onValueChange={(value) => updatelight(key, { sat: value })}
            />
            <View>
            </View>
            <Block flex={false} row style={{ marginTop: 19 }}>
                <Ionicons name="ios-color-filter" size={20} color="white"></Ionicons>
                <Text googlemedium style={[styles.textControl, { marginLeft: 10 }]}>Color</Text>
            </Block>
            {renderTabs()}
            {renderControlMode()}
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: theme.colors.background
    },
    header: {
        marginTop: 40
    },
    textControl: {
        textAlign: 'left',
        fontSize: 16
    },
    controlrow: {
        marginTop: 20, marginBottom: 10
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    textInput: {
        height: 30,
        borderBottomWidth: .5,
        borderRadius: 0,
        borderWidth: 0,
        color: theme.colors.white,
        textAlign: 'left',
        paddingBottom: 10,
        fontFamily: 'googlesans-regular'
    },
    tab: {
        paddingBottom: theme.sizes.base / 3
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3,
    }
});

export default ControlRoomScreen;