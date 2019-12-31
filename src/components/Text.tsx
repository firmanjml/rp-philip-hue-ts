import React from 'react';
import {
    StyleSheet,
    Text as RText,
    TextProperties,
} from 'react-native';
import { theme } from '../constants';

type TextTransformType = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';
type ColorType = 'accent' | 'primary' | 'secondary' | 'tertiary' | 'black' | 'white' | 'gray' | 'gray2' | 'gray3' | 'red';

interface Props extends TextProperties {
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    paragraph?: boolean;
    title?: boolean;
    body?: boolean;
    caption?: boolean;
    small?: boolean;
    size?: number;
    transform?: TextTransformType;
    align?: TextAlignType;
    regular?: boolean;
    bold?: boolean;
    semibold?: boolean;
    medium?: boolean;
    weight?: number;
    light?: boolean;
    center?: boolean;
    right?: boolean;
    spacing?: number;
    height?: number;
    color?: ColorType;
    accent?: boolean;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    black?: boolean;
    white?: boolean;
    gray?: boolean;
    gray2?: boolean;
    gray3?: boolean;
    style?: any;
    red?: boolean;
    children: React.ReactNode;
}

const Text = (
    {
        h1,
        h2,
        h3,
        paragraph,
        title,
        body,
        caption,
        small,
        size,
        transform,
        align,
        regular,
        bold,
        semibold,
        medium,
        weight,
        light,
        center,
        right,
        spacing,
        height,
        color,
        accent,
        primary,
        secondary,
        tertiary,
        black,
        white,
        gray,
        gray2,
        gray3,
        style,
        red,
        children,
        ...props
    }: Props
) => {
    const textStyles = [
        styles.text,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        paragraph && styles.paragraph,
        title && styles.title,
        body && styles.body,
        caption && styles.caption,
        small && styles.small,
        size && { fontSize: size },
        transform && { textTransform: transform },
        align && { textAlign: align },
        height && { lineHeight: height },
        spacing && { letterSpacing: spacing },
        weight && { fontWeight: weight },
        regular && styles.regular,
        bold && styles.bold,
        semibold && styles.semibold,
        medium && styles.medium,
        light && styles.light,
        center && styles.center,
        right && styles.right,
        color && styles[color],
        color && !styles[color] && { color },
        accent && styles.accent,
        primary && styles.primary,
        secondary && styles.secondary,
        tertiary && styles.tertiary,
        black && styles.black,
        white && styles.white,
        gray && styles.gray,
        gray2 && styles.gray2,
        gray3 && styles.gray3,
        red && styles.red,
        style
    ];

    return (
        <RText style={textStyles} {...props}>
            {children}
        </RText>
    );
}

const styles = StyleSheet.create({
    // default style
    text: {
        fontSize: theme.sizes.font,
        color: theme.colors.black
    },
    // variations
    regular: {
        fontWeight: "normal",
    },
    bold: {
        fontWeight: "bold",
    },
    semibold: {
        fontWeight: "500",
    },
    medium: {
        fontWeight: "500",
    },
    light: {
        fontWeight: "100",
    },
    // position
    center: { textAlign: "center" },
    right: { textAlign: "right" },
    // colors
    accent: { color: theme.colors.accent },
    primary: { color: theme.colors.primary },
    secondary: { color: theme.colors.secondary },
    tertiary: { color: theme.colors.tertiary },
    black: { color: theme.colors.black },
    white: { color: theme.colors.white },
    gray: { color: theme.colors.gray },
    gray2: { color: theme.colors.gray2 },
    gray3: { color: theme.colors.gray3 },
    red: { color: theme.colors.accent },
    // fonts
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    h3: theme.fonts.h3,
    paragraph: theme.fonts.paragraph,
    title: theme.fonts.title,
    body: theme.fonts.body,
    caption: theme.fonts.caption,
    small: theme.fonts.small
});

export default Text;