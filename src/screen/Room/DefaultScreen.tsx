import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text} from '../../components';
import { theme } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BridgePairedType, ConfigurationTypes, GroupTypes, LightTypes } from '../../types';
import BridgeInfo from '../../components/Room/BridgeInfo';
import RoomLayout from '../../components/Room/RoomLayout';
import LightLayout from '../../components/Light/LightLayout';
import { GetRoomList, GetLightList } from '../../redux/actions';

const { width } = Dimensions.get('window');

function DefaultScreen() {
    const dispatch = useDispatch();
    const getRoomList = useCallback(() => dispatch(GetRoomList()), [dispatch]);
    const getLightList = useCallback(() => dispatch(GetLightList()), [dispatch]);

    const night_mode: boolean = useSelector(state => state.night_mode);
    const groups: GroupTypes = useSelector(state => state.group_list);
    const lights: LightTypes = useSelector(state => state.light_list);

    const paired: BridgePairedType = useSelector(state => state.pairing_bridge);
    const bridge: ConfigurationTypes = useSelector(state => state.bridge_list[paired.id]);

    const { colors } = theme;
    const refreshtextcolor = night_mode ? colors.white : colors.black
    const textcolor = { color: night_mode ? colors.white : colors.black }
    const graytextcolor = { color: night_mode ? colors.gray2 : colors.black }
    const backgroundcolor = { backgroundColor: night_mode ? colors.background : colors.backgroundLight }

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
                    backgroundcolor,
                    isActive ? styles.active : null
                ]}>
                <Text size={16} bold gray={!isActive} secondary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderLayout = (tab) => {
        if (tab === "ROOMS") {
            return (
                <RoomLayout theme={theme} styles={styles} groups={groups} textcolor={textcolor} refreshtextcolor={refreshtextcolor} />
            )
        } else if (tab === "LIGHTS") {
            return (
                <LightLayout theme={theme} styles={styles} lights={lights} textcolor={textcolor} />
            )
        } else if (tab === "SCHEDULES") {
            return (
                <Text center white bold>Lek luu tgh bikin ni</Text>
            )
        }
    }

    return (
        <Block style={backgroundcolor}>
            <Block flex={false} center row space="between" style={styles.header}>
                <Text h1 style={[textcolor, { fontWeight: 'bold' }]}>Explore</Text>
            </Block>

            <BridgeInfo
                theme={theme}
                textcolor={textcolor}
                bridge={bridge} />

            <Block flex={false} row style={[styles.tabs, backgroundcolor]}>
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
        marginTop: 50,
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2,
    },
    tabs: {
        marginTop: 20,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10
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