import React from 'react';
import { Platform ,Text as NativeText, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    // fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial'
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorHeadline: {
    color: theme.colors.headline,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'headline' && styles.colorHeadline,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;