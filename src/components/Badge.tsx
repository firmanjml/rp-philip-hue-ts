import React from 'react';
import Block, { BlockProps } from './Block';
import { StyleSheet } from 'react-native';
import { theme } from '../constants';

export interface BadgeProps extends BlockProps {
    style?: any;
    color?: string;
    size?: number;
    children?: React.ReactNode;
}

function Badge({
    children,
    style,
    size,
    color,
    ...props
}: BadgeProps) {
    const badgeStyles = StyleSheet.flatten([
        styles.badge,
        size && {
            height: size,
            width: size,
            borderRadius: size
        },
        style
    ]);

    return (
        <Block flex={false} middle center color={color} style={badgeStyles} {...props}>
            {children}
        </Block>
    )
}

const styles = StyleSheet.create({
    badge: {
        height: theme.sizes.base,
        width: theme.sizes.base,
        borderRadius: theme.sizes.border,
    }
});

export default Badge;