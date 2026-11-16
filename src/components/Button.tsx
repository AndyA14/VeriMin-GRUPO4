import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, text } from '../theme';

type Variant = 'primary' | 'compact' | 'outline';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  /** Algunos botones del prototipo usan SemiBold en lugar de Bold. */
  semiBold?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
}

export function Button({ label, onPress, variant = 'primary', semiBold, style, accessibilityHint }: Props) {
  const labelStyle =
    variant === 'outline' ? styles.outlineLabel : variant === 'compact' ? styles.compactLabel : semiBold ? styles.semiLabel : styles.boldLabel;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}
    >
      <Text style={labelStyle} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  primary: { height: 56, borderRadius: radius.sm, backgroundColor: colors.button, paddingHorizontal: 12 },
  compact: { height: 56, width: 112, borderRadius: radius.sm, backgroundColor: colors.button, padding: 8 },
  outline: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.infoBg,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: 16,
  },
  pressed: { opacity: 0.85 },
  boldLabel: { ...text.button14, color: colors.onBlue, textAlign: 'center' },
  semiLabel: { ...text.buttonSemi14, color: colors.onBlue, textAlign: 'center' },
  compactLabel: { ...text.buttonSemi13, color: colors.onBlue, textAlign: 'center' },
  outlineLabel: { ...text.strong15, color: colors.infoText, textAlign: 'center' },
});
