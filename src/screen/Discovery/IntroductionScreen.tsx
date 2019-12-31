import React, { useState } from 'react';
import { Animated, FlatList, Image, StyleSheet } from 'react-native';
import { Block, Text, Button } from '../../components';
import { theme } from '../../constants';
import Layout from '../../constants/Layout';

function IntroductionScreen(props) {
    let scrollX = new Animated.Value(0);

    const [manual, setManual] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { colors } = theme;
    const backgroundcolor = { backgroundColor: colors.background };
    const textcolor = { color: colors.white }

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
        return (
            <Button gradient disabled={false} onPress={() => console.log('pressed')}>
                <Text center semibold white>Test</Text>
            </Button>
        )
    }

    return (
        <Block style={backgroundcolor}>
            <Block center bottom flex={0.4}>
                <Text h1 center bold style={textcolor}>
                    Your Smarter Home
                </Text>
                <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                    Enjoy the experience
                </Text>
            </Block>
            <Block center middle>
                {renderIllustrations()}
                {renderDots()}
            </Block>
            <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                {renderPairBtn()}
                <Button shadow onPress={() => console.log('pressed')}>
                    <Text center semibold>Manual Search</Text>
                </Button>
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