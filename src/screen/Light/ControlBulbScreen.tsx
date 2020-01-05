import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Block, Text, ToggleSwitch, Input } from '../../components';
import { theme } from '../../constants';
import Slider from 'react-native-slider';
import { LightTypes, LightUpdateStates } from '../../types';
import { ColorPicker } from "react-native-color-picker";
import { UpdateLightState } from '../../redux/actions';
import { useNavigationParam } from 'react-navigation-hooks';
import { Ionicons } from '@expo/vector-icons';

function ControlBulbScreen() {
    const { colors } = theme;
    const lampID = useNavigationParam('lampID');

    const dispatch = useDispatch();
    const light: LightTypes = useSelector(state => state.light_list);
    const updatelight = useCallback((lampID: string, json: LightUpdateStates) => dispatch(UpdateLightState(lampID, json)), [dispatch]);
    const bordercolor = { borderColor: colors.white }

    return (
        <Block style={styles.container}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 googlebold>{light[lampID].name}</Text>
                <ToggleSwitch
                    offColor="#DDDDDD"
                    onColor={theme.colors.secondary}
                    onToggle={() => updatelight(lampID, { on: !light[lampID].state.on })}
                    isOn={light[lampID].state.on}
                />
            </Block>
            <Text googlemedium style={[styles.textControl, { marginTop: 30 }]}>Room Name</Text>
            <Input
                style={[styles.textInput, bordercolor]}
                editable={false}
                value={"testing"}
                placeholderTextColor={colors.gray2}
            />
            <Block flex={false} row style={{marginTop: 8, marginBottom: 10}}>
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
                value={light[lampID].state.bri}
                onValueChange={(value) => updatelight(lampID, { bri: value })}
            />
            <Block flex={false} row style={styles.controlrow}>
                <Ionicons name="ios-water" size={20} color="white"></Ionicons>
                <Text googlemedium style={[styles.textControl,{ marginLeft: 10 }]}>Saturation</Text>
            </Block>
            <Slider
                minimumValue={1}
                maximumValue={254}
                style={{ height: 25 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 15, borderRadius: 10 }}
                minimumTrackTintColor={colors.secondary}
                maximumTrackTintColor={"rgba(157, 163, 180, 0.10)"}
                value={light[lampID].state.sat}
                onValueChange={(value) => updatelight(lampID, { sat: value })}
            />
            <Block flex={false} row style={{ marginTop: 19 }}>
                <Ionicons name="ios-color-filter" size={20} color="white"></Ionicons>
                <Text googlemedium style={[styles.textControl, { marginLeft: 10 }]}>Color</Text>
            </Block>
            <ColorPicker
                onColorChange={() => console.log("asdasd")}
                style={{ flex: 1 }}
                hideSliders={true}
            />
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
        color : theme.colors.white,
        textAlign: 'left',
        paddingBottom: 10,
        fontFamily: 'googlesans-regular'
    }
});

export default ControlBulbScreen;