import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text } from '../../components';
import { theme } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BridgePairedType, ConfigurationTypes, GroupTypes, LightTypes } from '../../hueapi/types';
import BridgeInfo from '../../components/Room/BridgeInfo';
import RoomLayout from '../../components/Room/RoomLayout';
import LightLayout from '../../components/Light/LightLayout';
import ScheduleLayout from '../../components/Schedule/ScheduleLayout';
import { GetRoomList, GetLightList } from '../../redux/actions';
import { Entypo } from '@expo/vector-icons'
import {useNavigation} from 'react-navigation-hooks'

const { width } = Dimensions.get('window');

function DefaultScreen() {
    const dispatch = useDispatch();
    const getRoomList = useCallback(() => dispatch(GetRoomList()), [dispatch]);
    const getLightList = useCallback(() => dispatch(GetLightList()), [dispatch]);

    const groups: GroupTypes = useSelector(state => state.group_list);
    const lights: LightTypes = useSelector(state => state.light_list);

    const paired: BridgePairedType = useSelector(state => state.pairing_bridge);
    const bridge: ConfigurationTypes = useSelector(state => state.bridge_list[paired.id]);

    const { colors } = theme;
    const { navigate } = useNavigation();


    const [active, setActive] = useState('ROOMS');
    const tabs = ['ROOMS', 'LIGHTS', 'SCHEDULES'];

    useEffect(() => {
        getRoomList();
        getLightList();
    }, []);

    const renderTabs = (tab) => {
        const isActive = active === tab;
        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => {
                    setActive(tab)
                }}
                style={[
                    styles.tab,
                    styles.container,
                    isActive ? styles.active : null
                ]}>
                <Text size={16} googlebold gray={!isActive} secondary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderLayout = (tab) => {
        if (tab === "ROOMS") {
            return (
                <RoomLayout theme={theme} styles={styles} groups={groups} />
            )
        } else if (tab === "LIGHTS") {
            return (
                <LightLayout theme={theme} styles={styles} lights={lights} />
            )
        } else if (tab === "SCHEDULES") {
            return (
                <ScheduleLayout theme={theme} styles={styles} schedule={null} />
            )
        }
    }

    return (
        <Block style={styles.container}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 googlebold>Explore</Text>
                <TouchableOpacity onPress={() => navigate('SettingList')}>
                    <Entypo name="cog" size={30} color="white"></Entypo>
                </TouchableOpacity>
            </Block>

            <BridgeInfo
                theme={theme}
                bridge={bridge} />

            <Block flex={false} row style={[styles.tabs, styles.container]}>
                {tabs.map(tab => renderTabs(tab))}
            </Block>
            {renderLayout(active)}
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background
    },
    header: {
        marginTop: 25,
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2,
    },
    tabs: {
        marginTop: 25,
        justifyContent: 'space-around',
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    tab: {
        paddingBottom: theme.sizes.base / 3
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3,
    },
    categories: {
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 3.5,
    },
    bulbRow: {
        marginBottom: 20,
        paddingBottom: 15,
        borderRadius: 10
    },
    scheduleRow: {

    },
    category: {
        minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    },
    roomText: {
        fontSize: (width <= 350) ? 9 : (width < 380) ? 12 : 14
    },
    divider: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    // divider: {
    //     marginTop: 20,
    //     marginVertical: 5,
    //     marginHorizontal: 2,
    //     borderBottomWidth: 1,
    //     borderColor: "#747880"
    // }
});

export default DefaultScreen;