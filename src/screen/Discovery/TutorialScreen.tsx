import React, { useCallback } from 'react';
import { Block, Text } from '../../components';
import { theme } from '../../constants';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'react-navigation-hooks';
import Layout from '../../constants/Layout';
import { constant } from '../../constants';
import WebBrowser from 'expo-web-browser';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

function TutorialScreen() {
    const night_mode = useSelector(state => state.night_mode);

    const { colors } = theme;

    const backgroundcolor = { backgroundColor: night_mode ? colors.background : colors.backgroundLight };
    const textcolor = { color: night_mode ? colors.white : colors.black }

    const { goBack } = useNavigation();
    
    const renderItem = ({ item }) => (
        <Block style={backgroundcolor} >
            <Block container style={styles.slide}>
                <View style={{ marginTop: 10 }} >
                    <Text googlebold style={[styles.title, textcolor]}>{item.title}</Text>
                    <Text googlemedium style={[styles.text, textcolor]}>{item.text}</Text>
                    <TouchableOpacity onPress={async () => {
                        await WebBrowser.openBrowserAsync('https://www.technobezz.com/how-to-find-your-router-ip-address/');
                    }}>
                        <Text medium style={[styles.text, textcolor, { textDecorationLine: 'underline' }]}>{item.url}</Text>
                    </TouchableOpacity>
                </View>
            </Block>
            <View style={styles.imageBlock}>
                <Image
                    resizeMethod='auto'
                    source={item.image}
                    style={styles.image} />
            </View>
        </Block>
    )

    return (
        <AppIntroSlider
            renderItem={renderItem}
            slides={constant.step_slider}
            onDone={() => goBack()}
            renderNextButton={() => (
                <View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Ionicons
                        name="md-arrow-round-forward"
                        color="rgba(255, 255, 255, .9)"
                        size={24}
                        style={{ backgroundColor: 'transparent' }}
                    />
                </View>
            )}
            renderDoneButton={() => (
                <View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Ionicons
                        name="md-checkmark"
                        color="rgba(255, 255, 255, .9)"
                        size={24}
                        style={{ backgroundColor: 'transparent' }}
                    />
                </View>
            )}
        />
    )
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
    },
    imageBlock: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Layout.window.width / 1.5,
        height: Layout.window.height / 1.5,
        resizeMode: 'contain',
        marginBottom: 10
    },
    title: {
        textAlign: 'left',
        fontWeight: '200',
        fontSize: 30
    },
    text: {
        fontWeight: '200',
        textAlign: 'left',
        fontSize: 15,
        marginTop: 10
    },
    list: {
        textAlign: 'center'
    }
});

export default TutorialScreen;