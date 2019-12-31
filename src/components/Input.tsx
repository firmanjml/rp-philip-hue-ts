import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProperties
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Block from './Block';
import Text from './Text';
import Button from './Button';
import { theme } from '../constants';

export interface InputProps extends TextInputProperties {
    label?: any;
    error?: any;
    secure?: any;
    rightLabel?: any;
    rightStyle?: any;
    onRightPress?: any;
    style?: any;
    email?: boolean;
    phone?: boolean;
    number?: boolean;
}

const Input = ({
    email,
    phone,
    number,
    secure,
    error,
    label,
    rightLabel,
    rightStyle,
    onRightPress,
    ...props
}: InputProps) => {
    const [toggleSecure, setToggleSecure] = React.useState(false);
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
        styles.input,
        error && { borderColor: theme.colors.accent }
    ];

    const inputType = email
        ? 'email-address' : number
            ? 'numeric' : phone
                ? 'phone-pad' : 'default';


    function renderLabel() {
        return (
            <Block flex={false}>
                {label ? <Text gray2={!error} accent={error}>{label}</Text> : null}
            </Block>
        )
    }

    function renderToggle() {
        if (!secure) return null;

        return (
            <Button
                style={styles.toggle}
                onPress={() => setToggleSecure(prevState => !prevState)}
            >
                {
                    rightLabel ? rightLabel :
                        <Ionicons
                            color={theme.colors.gray}
                            size={theme.sizes.font * 1.35}
                            name={!toggleSecure ? "md-eye" : "md-eye-off"}
                        />
                }
            </Button>
        );
    }

    function renderRight() {

        if (!rightLabel) return null;

        return (
            <Button
                style={[styles.toggle, rightStyle]}
                onPress={() => onRightPress && onRightPress()}
            >
                {rightLabel}
            </Button>
        );
    }

    return (
        <Block flex={false} margin={[theme.sizes.base, 0]}>
            {renderLabel()}
            <TextInput
                style={inputStyles}
                secureTextEntry={isSecure}
                autoCompleteType="off"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={inputType}
                {...props}
            />
            {renderToggle()}
            {renderRight()}
        </Block>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.black,
        borderRadius: theme.sizes.radius,
        fontSize: theme.sizes.font,
        fontWeight: '500',
        color: theme.colors.black,
        height: theme.sizes.base * 3,
    },
    toggle: {
        position: 'absolute',
        alignItems: 'flex-end',
        width: theme.sizes.base * 2,
        height: theme.sizes.base * 2,
        top: theme.sizes.base,
        right: 0,
    }
});

export default Input;