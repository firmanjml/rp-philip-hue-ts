import React from 'react';
import Block, { BlockProps } from "./Block";
import { theme } from '../constants';
import { StyleSheet } from "react-native";

export interface CardProps extends BlockProps {
    color?: object;
    style?: any;
    children?: React.ReactNode;
}

function Card({
    color,
    style,
    children,
    ...props
}: CardProps) {
    
    const cardStyles = [
        styles.card,
        style,
    ];

    return (
        <Block color={color || theme.colors.white} style={cardStyles} {...props}>
            {children}
        </Block>
    )
}

export const styles = StyleSheet.create({
    card: {
        borderRadius: theme.sizes.radius,
        padding: theme.sizes.base + 4,
        marginBottom: theme.sizes.base,
    },
});

export default Card;