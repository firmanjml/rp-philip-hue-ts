import React, {useCallback} from 'react';
import { Animated, FlatList, Image, StyleSheet, View } from 'react-native';
import { Block, Text, Button } from '../../components';
import { theme } from '../../constants';
import Layout from '../../constants/Layout';
import { useSelector, useDispatch } from 'react-redux'
import { SearchBridge, ClearBridge } from '../../redux/actions';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

function IntroductionScreen(props) {

    let scrollX = new Animated.Value(0);
    const { colors } = theme;

    const backgroundcolor = { backgroundColor: colors.background};

    const { navigate } = useNavigation();

    function renderIllustrations() {
        const { illustrations } = props;
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment='center'
                data={illustrations}
                keyExtractor={(item: any, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode='contain'
                        style={{ width: Layout.window.width, height: Layout.window.height / 2, overflow: 'visible' }}
                    />
                )}
                onScroll={
                    Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                x: scrollX
                            }
                        }
                    }])
                }
            />
        )
    }

    function renderDots() {
        const { illustrations } = props;
        const stepPosition = Animated.divide(scrollX, Layout.window.width);
        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Block
                            animated
                            flex={false}
                            key={`step-${index}`}
                            color="gray"
                            style={[styles.steps, { opacity }]}
                        />
                    )
                })}
            </Block>
        )
    }

    function renderPairBtn() {
        // actions
        const dispatch = useDispatch();
        const searchBridge = useCallback(() => dispatch(SearchBridge), [dispatch])
        const searchBridgeClear = useCallback(() => dispatch(ClearBridge()), [dispatch])

        // states
        const loading = useSelector(state => state.search_bridge_loading);
        const bridge_list = useSelector(state => state.search_bridge_list);
        const bridge_state = useSelector(state => state.search_bridge_complete);

        if (!bridge_state) {
            if (loading) {
                return (
                    <Button>
                        <Text center googlebold>Searching...</Text>
                    </Button>
                )
            } else {
                return (
                    <Button gradient
                        startColor='#0A7CC4'
                        endColor='#2BDACD'
                        onPress={() => searchBridge()}>
                        <Text center googlebold>Search for bridge</Text>
                    </Button>
                )
            }
        } else {
            if (bridge_list.length === 0) {
                return (
                    <View>
                        <Button
                            gradient
                            startColor='#0A7CC4'
                            endColor='#2BDACD'
                            onPress={() => navigate('ManualLink')}>
                            <Text white center googlemedium>Manual Search</Text>
                        </Button>
                        <Text center style={{ marginTop: 10 }}>No Bridge Found</Text>
                    </View>
                )
            } else {
                return (
                    <Button
                        gradient
                        startColor='#0A7CC4'
                        endColor='#2BDACD'
                        onPress={() => navigate('BridgeList')}>
                        <Text center googlebold>{`${bridge_list.length} ${bridge_list.length > 1 ? 'bridges' : 'bridge'} found`}</Text>
                    </Button>
                )
            }
        }

    }

    function renderManualBtn() {
        return (
            <TouchableOpacity
                style={{marginTop : 10}}
                onPress={() => navigate('ManualLink')}>
                <Text center>Manual Search</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Block style={backgroundcolor}>
            <Block center bottom flex={0.4}>
                <Text h1 center googlebold>
                    LigHue
                </Text>
                <Text h3 gray2 googleregular style={{ marginTop: theme.sizes.padding / 2 }}>
                    Control your Hue Bridge V1
                </Text>
            </Block>
            <Block center middle>
                {renderIllustrations()}
                {renderDots()}
            </Block>
            <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                {renderPairBtn()}
                {renderManualBtn()}
            </Block>
        </Block>
    )
}

IntroductionScreen.defaultProps = {
    illustrations: [
        {
            id: 1,
            source: require('../../../assets/images/illustration_1.png')
        },
        {
            id: 2,
            source: require('../../../assets/images/illustration_2.png')
        },
        {
            id: 3,
            source: require('../../../assets/images/illustration_3.png')
        }
    ]
}

const styles = StyleSheet.create({
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base * 3,
        right: 0,
        left: 0
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5
    }
});

export default IntroductionScreen;