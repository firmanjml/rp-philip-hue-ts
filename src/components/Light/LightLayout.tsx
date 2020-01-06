import React, { useCallback } from 'react';
import Block from "../Block";
import Text from "../Text";
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity } from "react-native";
import ToggleSwitch from "../ToggleSwitch";
import { LightTypes, LightUpdateStates } from "../../hueapi/types";
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { UpdateLightState } from '../../redux/actions';
import { useNavigation } from 'react-navigation-hooks';

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
        <View>
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
                                <View style={{ paddingHorizontal: theme.sizes.base * 2 }}>
                                    <View style={styles.bulbRow}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => navigate('ControlBulb', { lampID: key })}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text googlemedium style={{ fontSize: 21, alignSelf: 'center' }}>{lights[key].name.length > 15 ? lights[key].name.substring(0, 15) + "..." : lights[key].name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <ToggleSwitch
                                            offColor="#DDDDDD"
                                            onColor={theme.colors.secondary}
                                            onToggle={() => updatelight(key, { on: !lights[key].state.on })}
                                            isOn={lights[key].state.on}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    )
            }
        </View>
    )
}
export default LightLayout;