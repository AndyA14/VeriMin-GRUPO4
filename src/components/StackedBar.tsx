import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface Segment {
  label: string;
  value: number;
  color: string;
}

/** Barra apilada al 100 %: cada segmento ocupa su proporción del total. */
export function StackedBar({ segments, height, radiusSize }: { segments: readonly Segment[]; height: number; radiusSize: number }) {
  return (
    <View style={[styles.bar, { height, borderRadius: radiusSize }]} accessibilityRole="image"
      accessibilityLabel={segments.map((s) => `${s.label} ${s.value} %`).join(', ')}>
      {segments.map((s) => (
        <View key={s.label} style={{ flex: s.value, backgroundColor: s.color }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', overflow: 'hidden' },
});
