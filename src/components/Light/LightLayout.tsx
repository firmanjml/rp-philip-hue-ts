import React, { useCallback } from 'react';
import Block from "../Block";
import Text from "../Text";
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ToggleSwitch from "../ToggleSwitch";
import { LightTypes, LightUpdateStates } from "../../hueapi/types";
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { UpdateLightState } from '../../redux/actions';
import { useNavigation } from 'react-navigation-hooks';
import { ColorizeRows } from '../../utils'
import { MaterialIcons } from '@expo/vector-icons';

interface LightLayoutProps {
    lights: LightTypes;
    theme: any;
    styles: any;
}
function LightLayout({
    lights,
    theme,
    styles
}: LightLayoutProps) {

    const dispatch = useDispatch();
    const updatelight = useCallback((key: string, data: LightUpdateStates) => dispatch(UpdateLightState(key, data)), [dispatch]);
    const { navigate } = useNavigation();

    return (
        <View style={{ paddingHorizontal: theme.sizes.base * 2 }}>
            {
                Object.entries(lights).length === 0 && lights.constructor === Object ?
                    (
                        <Block style={{ paddingHorizontal: theme.sizes.base * 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text h1 bold>No light is found.</Text>
                            <TouchableOpacity
                                onPress={() => console.log('navigate')}>
                                <Text h2 googlebold style={{ marginTop: 5, color: '#20D29B' }}>Search for new lights</Text>
                            </TouchableOpacity>
                        </Block>
                    )
                    :
                    (
                        <FlatList
                            keyExtractor={(item) => item}
                            data={Object.keys(lights)}
                            renderItem={({ item: key }) => (
                                <View style={[styles.bulbRow, { backgroundColor: ColorizeRows.colorizeRow() }]}>
                                    <TouchableOpacity onPress={() => navigate('ControlBulb', { lampID: key })}>
                                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text googlemedium style={{ fontSize: 21, marginLeft: 20 }}>{lights[key].name.length > 15 ? lights[key].name.substring(0, 15) + "..." : lights[key].name}</Text>
                                            <View style={{ marginRight: 20 }}>
                                                <ToggleSwitch
                                                    offColor="#DDDDDD"
                                                    onColor={theme.colors.secondary}
                                                    onToggle={() => updatelight(key, { on: !lights[key].state.on })}
                                                    isOn={lights[key].state.on}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={{ marginTop: 5 }}>Brightness : {Math.round((lights[key].state.bri * 100) / 254)}%</Text>
                                            <Text style={{ marginTop: 5 }}>Saturation : {Math.round((lights[key].state.sat * 100) / 254)}%</Text>
                                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                <MaterialIcons name="room" size={20} color='white'></MaterialIcons>
                                                <Text style={{ marginLeft: 5 }}>Room</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                            }
                        />
                    )
            }
        </View >
    )
}

export default LightLayout;