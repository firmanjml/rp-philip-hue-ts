import React, { useCallback } from 'react';
import { Block, Text } from '../../components';
import { theme } from '../../constants';
import { FlatList, TouchableOpacity, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '../../components/Divider';
import { ManualSearchBridge } from '../../redux/actions';
import { useNavigation } from 'react-navigation-hooks';
import { Ionicons } from '@expo/vector-icons';

function BridgeListScreen() {
    const dispatch = useDispatch();
    const searchBridge = useCallback((ip: string, navigate: any) => dispatch(ManualSearchBridge(ip, navigate)), [dispatch])
    const night_mode = useSelector(state => state.night_mode);
    const bridge_list = useSelector(state => state.search_bridge_list);

    const { colors } = theme;

    const backgroundcolor = { backgroundColor: night_mode ? colors.background : colors.backgroundLight };
    const textcolor = { color: night_mode ? colors.white : colors.black }

    const { goBack, navigate } = useNavigation();

    return (
        <Block style={backgroundcolor}>
            <Block margin={[50, 0, 0, 0]}>
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ height: 40, width: 80, justifyContent: 'center' }}>
                        <Ionicons name='md-arrow-back' size={30} color={'white'} />
                    </TouchableOpacity>
                    <Text h1 style={textcolor}>List of found bridge</Text>
                </View>
                <FlatList
                    style={{ marginVertical: 10, padding: 10 }}
                    scrollEnabled
                    snapToAlignment='center'
                    data={bridge_list}
                    keyExtractor={(item: any, index) => `${item.id}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => {
                            Alert.alert(
                                `Pair with ${item.internalipaddress}`,
                                `Are you sure you want to pair to this bridge?`,
                                [
                                    {
                                        text: 'Yes',
                                        style: 'default',
                                        onPress: () => {
                                            searchBridge(item.internalipaddress, navigate)
                                        }
                                    },
                                    {
                                        text: 'No',
                                        style: 'cancel'
                                    }
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={textcolor}>Bridge IP: </Text>
                                <Text style={textcolor}>{item.internalipaddress}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={textcolor}>Bridge ID: </Text>
                                <Text style={textcolor}>{item.id}</Text>
                            </View>
                            <Divider margin={1} />
                        </TouchableOpacity>
                    )}
                />
            </Block>
        </Block>
    )
}

export default BridgeListScreen;