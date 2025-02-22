import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProperties
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants';

type ColorType = 'accent' | 'primary' | 'secondary' | 'tertiary' | 'black' | 'white' | 'gray' | 'gray2' | 'gray3' | 'red';

export interface ButtonProps extends TouchableOpacityProperties {
    style?: any;
    opacity?: number;
    gradient?: boolean;
    color?: ColorType;
    startColor?: string;
    endColor?: string;
    end?: any;
    start?: any;
    locations?: any;
    shadow?: boolean;
    children?: React.ReactNode;
}

const Button = ({
    style,
    opacity,
    gradient,
    color,
    startColor,
    endColor,
    end,
    start,
    locations,
    shadow,
    children,
    ...props
}: ButtonProps) => {
    const buttonStyles = [
        styles.button,
        shadow && styles.shadow,
        color && styles[color],
        color && !styles[color] && { backgroundColor: color },
        style,
    ];

    if (gradient) {
        return (
            <TouchableOpacity
                style={buttonStyles}
                activeOpacity={opacity}
                {...props}
            >
                <LinearGradient
                    start={start}
                    end={end}
                    locations={locations}
                    style={buttonStyles}
                    colors={[startColor, endColor]}
                >
                    {children}
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            style={buttonStyles}
            activeOpacity={opacity || 0.8}
            {...props}
        >
            {children}
        </TouchableOpacity>
    )
}

Button.defaultProps = {
    startColor: theme.colors.primary,
    endColor: theme.colors.secondary,
    start: [0,0],
    end: [1,1],
    locations: [0.1, 0.9],
    opacity: 0.8,
    color: theme.colors.white,
}

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.sizes.radius,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        marginVertical: theme.sizes.padding / 3,
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    accent: { backgroundColor: theme.colors.accent, },
    primary: { backgroundColor: theme.colors.primary, },
    secondary: { backgroundColor: theme.colors.secondary, },
    tertiary: { backgroundColor: theme.colors.tertiary, },
    black: { backgroundColor: theme.colors.black, },
    white: { backgroundColor: theme.colors.white, },
    gray: { backgroundColor: theme.colors.gray, },
    gray2: { backgroundColor: theme.colors.gray2, },
    gray3: { backgroundColor: theme.colors.gray3, },
    gray4: { backgroundColor: theme.colors.gray4, },
});

export default Button;