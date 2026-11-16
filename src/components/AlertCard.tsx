import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { radius, text, Tone, tones } from '../theme';

interface Props {
  tone: Extract<Tone, 'danger' | 'warning'>;
  title: string;
  detail: string;
}

/** Alerta de integridad (anomalía / comentarios hostiles). */
export function AlertCard({ tone, title, detail }: Props) {
  const t = tones[tone];
  return (
    <View style={[styles.card, { backgroundColor: t.bg, borderColor: t.border }]} accessible accessibilityLabel={`${title}. ${detail}`}>
      <AlertTriangle size={17} color={t.text} strokeWidth={1.5} absoluteStrokeWidth />
      <Text style={[styles.title, { color: t.text }]}>{title}</Text>
      <Text style={[styles.detail, { color: t.body }]}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, alignSelf: 'flex-start', padding: 12, gap: 8, borderWidth: 1, borderRadius: radius.sm },
  title: { ...text.heading12, lineHeight: 16.8 },
  detail: { ...text.body11 },
});
