import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    ViewProperties
} from 'react-native';
import { theme } from '../constants';

export interface BlockProps extends ViewProperties {
    margin?: any;
    padding?: number | object;
    flex?: boolean | number;
    row?: boolean;
    column?: boolean;
    center?: boolean;
    middle?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    container?: boolean;
    containerNoHeader?: boolean;
    bottom?: boolean;
    card?: number;
    shadow?: boolean;
    color?: any;
    space?: string;
    animated?: boolean;
    wrap?: boolean;
    style?: any;
    children?: React.ReactNode;
}

const Block = ({ 
    flex,
    row,
    column,
    center,
    middle,
    left,
    right,
    top,
    container,
    containerNoHeader,
    bottom,
    card,
    shadow,
    color,
    space,
    padding,
    margin,
    animated,
    wrap,
    style,
    children,
    ...props 
}: BlockProps) => {

    function handleMargins() {
        if (typeof margin === 'number') {
            return {
                marginTop: margin,
                marginRight: margin,
                marginBottom: margin,
                marginLeft: margin,
            }
        }

        if (typeof margin === 'object') {
            const marginSize = Object.keys(margin).length;
            switch (marginSize) {
                case 1:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[0],
                        marginBottom: margin[0],
                        marginLeft: margin[0],
                    }
                case 2:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[0],
                        marginLeft: margin[1],
                    }
                case 3:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[2],
                        marginLeft: margin[1],
                    }
                default:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[2],
                        marginLeft: margin[3],
                    }
            }
        }
    }

    function handlePaddings() {
        if (typeof padding === 'number') {
            return {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding,
            }
        }

        if (typeof padding === 'object') {
            const paddingSize = Object.keys(padding).length;
            switch (paddingSize) {
                case 1:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[0],
                        paddingBottom: padding[0],
                        paddingLeft: padding[0],
                    }
                case 2:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[0],
                        paddingLeft: padding[1],
                    }
                case 3:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[2],
                        paddingLeft: padding[1],
                    }
                default:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[2],
                        paddingLeft: padding[3],
                    }
            }
        }
    }

    const blockStyles = [
        styles.block,
        flex && { flex },
        flex === false && { flex: 0 },
        row && styles.row,
        column && styles.column,
        center && styles.center,
        middle && styles.middle,
        left && styles.left,
        right && styles.right,
        top && styles.top,
        container && styles.container,
        containerNoHeader && styles.containerNoHeader,
        bottom && styles.bottom,
        margin && { ...handleMargins() },
        padding && { ...handlePaddings() },
        card && styles.card,
        shadow && styles.shadow,
        space && { justifyContent: `space-${space}` },
        wrap && { flexWrap: 'wrap' },
        color && styles[color],
        color && !styles[color] && { backgroundColor: color },
        style,
    ];

    if (animated) {
        return (
            <Animated.View style={blockStyles} {...props}>
                {children}
            </Animated.View>
        )
    }

    return (
        <View style={blockStyles} {...props}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    card: {
        borderRadius: theme.sizes.radius,
    },
    center: {
        alignItems: 'center',
    },
    middle: {
        justifyContent: 'center',
    },
    left: {
        justifyContent: 'flex-start',
    },
    right: {
        justifyContent: 'flex-end',
    },
    top: {
        justifyContent: 'flex-start'
    },
    container: {
        justifyContent: 'flex-start',
        marginTop: theme.sizes.base * 5,
        paddingHorizontal: theme.sizes.base * 2,
    },
    containerNoHeader: {
        justifyContent: 'flex-start',
        marginTop: theme.sizes.base,
        paddingHorizontal: theme.sizes.base * 2,
    },
    bottom: {
        justifyContent: 'flex-end',
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 2,
    },
    accent: { backgroundColor: theme.colors.accent, },
    primary: { backgroundColor: theme.colors.primary, },
    secondary: { backgroundColor: theme.colors.secondary, },
    tertiary: { backgroundColor: theme.colors.tertiary, },
    black: { backgroundColor: theme.colors.black, },
    white: { backgroundColor: theme.colors.white, },
    gray: { backgroundColor: theme.colors.gray, },
    gray2: { backgroundColor: theme.colors.gray2, },
})

export default Block;