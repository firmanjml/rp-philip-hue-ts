import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';

export interface ToggleSwitchProps {
    isOn: boolean;
    label?: string;
    onColor: string;
    offColor: string;
    size?: string;
    labelStyle?: object;
    onToggle: Function;
    icon?: object;
    speed?: number;
}

export default class ToggleSwitch extends Component<ToggleSwitchProps>{
    static calculateDimensions(size) {
        switch (size) {
            case 'small':
                return ({
                    width: 50, padding: 10, circleWidth: 15, circleHeight: 15, translateX: 22,
                });
            case 'large':
                return ({
                    width: 100, padding: 20, circleWidth: 30, circleHeight: 30, translateX: 38,
                });
            default:
                return ({
                    width: 50, padding: 15, circleWidth: 23, circleHeight: 23, translateX: 30,
                });
        }
    }

    static defaultProps = {
        isOn: false,
        onColor: '#634fc9',
        offColor: '#ecf0f1',
        size: 'medium',
        labelStyle: {},
        icon: null,
        speed: 300
    }

    offsetX = new Animated.Value(0);
    dimensions = ToggleSwitch.calculateDimensions(this.props.size);

    createToggleSwitchStyle = () => ({
        backgroundColor: (this.props.isOn) ? this.props.onColor : this.props.offColor,
    })
    
    createInsideCircleStyle = () => ({
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        position: 'absolute',
        backgroundColor: 'white',
        transform: [{ translateX: this.offsetX }],
        width: this.dimensions.circleWidth,
        height: this.dimensions.circleHeight,
        borderRadius: (this.dimensions.circleWidth / 2),
    });

    render() {
        const toValue = this.props.isOn ? this.dimensions.width - this.dimensions.translateX : 0;

        Animated.timing(
            this.offsetX,
            {
                toValue,
                duration: this.props.speed,
            },
        ).start();

        return (
            <View style={styles.container}>
                {(this.props.label)
                    ? <Text style={[styles.labelStyle, this.props.labelStyle]}>{this.props.label}</Text>
                    : null
                }
                <TouchableOpacity
                    style={[{
                        justifyContent: 'center',
                        width: this.dimensions.width,
                        borderRadius: 20,
                        padding: this.dimensions.padding
                    }, this.createToggleSwitchStyle()]}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.onToggle(!this.props.isOn);
                    }}
                >
                    <Animated.View style={this.createInsideCircleStyle()} >{this.props.icon}</Animated.View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelStyle: {
        marginHorizontal: 10,
    },
});