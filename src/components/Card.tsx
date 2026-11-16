import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { radius, Tone, tones } from '../theme';

interface Props {
  tone?: Tone;
  radiusSize?: number;
  borderWidth?: number;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function Card({ tone = 'neutral', radiusSize = radius.md, borderWidth = 1, borderColor, style, children }: Props) {
  const t = tones[tone];
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: t.bg, borderColor: borderColor ?? t.border, borderRadius: radiusSize, borderWidth },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: 12, paddingHorizontal: 14 },
});
