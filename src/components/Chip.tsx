import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, text } from '../theme';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  paddingHorizontal?: number;
}

/** Selector en forma de píldora (casos de apoyo, método de pago). */
export function Chip({ label, selected, onPress, paddingHorizontal = 12 }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, { paddingHorizontal }, selected ? styles.selected : styles.idle]}
    >
      <Text style={[styles.label, { color: selected ? colors.onBlue : colors.textMuted }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 7, borderRadius: radius.pill, borderWidth: 1 },
  selected: { backgroundColor: colors.blueStrong, borderColor: colors.blueStrong },
  idle: { backgroundColor: colors.surface, borderColor: colors.border },
  label: { ...text.chip },
});
