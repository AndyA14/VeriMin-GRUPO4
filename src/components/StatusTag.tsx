import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { radius, text, Tone, tones } from '../theme';

interface Props {
  tone: Tone;
  label: string;
  style?: StyleProp<ViewStyle>;
}

/** Átomo / Etiqueta de estado (info, peligro, advertencia, éxito). */
export function StatusTag({ tone, label, style }: Props) {
  const t = tones[tone];
  return (
    <View style={[styles.tag, { backgroundColor: t.bg, borderColor: t.border }, style]}>
      <Text style={[styles.label, { color: t.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  label: { ...text.chip },
});
