import React from 'react';
import Block from "../Block";
import Text from "../Text";
import { View, TouchableOpacity } from "react-native";
import { ToggleSwitch } from "..";
import { LightTypes } from "../../types";
import { ScrollView } from 'react-native-gesture-handler';

interface LightLayoutProps {
    lights: LightTypes;
    theme: any;
    textcolor: any;
    styles: any;
}
function LightLayout({
    lights,
    theme,
    textcolor,
    styles
}: LightLayoutProps) {
    return (
        <View>
            {
                Object.entries(lights).length === 0 && lights.constructor === Object ?
                    (
                        <Block style={{ paddingHorizontal: theme.sizes.base * 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text h1 bold style={[textcolor]}>No light is found.</Text>
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
                                                <TouchableOpacity>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {/*<Icon.Ionicons name="ios-bulb" size={25} style={{ alignSelf: 'center', marginRight: 10 }} color={theme.colors.gray} /> */}
                                                        <Text googlemedium style={[textcolor, { fontSize: 21, alignSelf: 'center' }]}>{lights[keys].name.length > 15 ? lights[keys].name.substring(0, 15) + "..." : lights[keys].name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    {/* <Icon.Ionicons name="md-information-circle-outline" size={22} style={{ marginLeft: 15, alignSelf: 'center' }} color={theme.colors.gray} /> */}
                                                </TouchableOpacity>
                                            </View>
                                            <ToggleSwitch
                                                offColor="#DDDDDD"
                                                onColor={theme.colors.secondary}
                                                isOn={lights[keys].state.on}
                                                onToggle={(value) => console.log('test')}
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