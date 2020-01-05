import React, { useCallback } from 'react';
import Block from "../Block";
import Text from "../Text";
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity } from "react-native";
import ToggleSwitch from "../ToggleSwitch";
import { LightTypes } from "../../types";
import { ScrollView } from 'react-native-gesture-handler';
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
    const updatelight = useCallback((lampID, json) => dispatch(UpdateLightState(lampID, json)), [dispatch]);
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
                        <ScrollView>
                            {
                                Object.keys(lights).map((keys) => (
                                    <View key={keys} style={{ paddingHorizontal: theme.sizes.base * 2 }}>
                                        <View style={styles.bulbRow}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={(keys) => navigate('ControlBulb', {lampID : 1})}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text googlemedium style={{ fontSize: 21, alignSelf: 'center' }}>{lights[keys].name.length > 15 ? lights[keys].name.substring(0, 15) + "..." : lights[keys].name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <ToggleSwitch
                                                offColor="#DDDDDD"
                                                onColor={theme.colors.secondary}
                                                onToggle={() => updatelight(keys, `{"on" : ${!lights[keys].state.on}}`)}
                                                isOn={lights[keys].state.on}
                                            />
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    )
            }
        </View>
    )
}
export default LightLayout;