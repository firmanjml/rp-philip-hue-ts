import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Block, { BlockProps } from './Block';
import { theme } from '../constants';

export interface DividerProps extends BlockProps {
    color?: string,
    style?: any,
    margin?: number
}

function Divider({
    color,
    style,
    margin,
    ...props
}: DividerProps) {
    const dividerStyles = [
        styles.divider,
        style,
    ];
    const marginT = margin ? margin : theme.sizes.base * 2;
    return (
        <Block
            color={color || theme.colors.gray2}
            style={[dividerStyles, { margin: marginT }]}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});

export default Divider;