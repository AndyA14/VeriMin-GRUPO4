import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BadgeCheck } from 'lucide-react-native';
import { colors, radius, text } from '../theme';

interface Props {
  title: string;
  description: string;
  onPress: () => void;
}

/** Acción · tarjeta pulsable con chevron (Informe con IA, Público, Apoyo). */
export function ActionCard({ title, description, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.tile}>
        <BadgeCheck size={17} color={colors.infoIcon} strokeWidth={1.5} absoluteStrokeWidth />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.infoBg,
    borderWidth: 1,
    borderColor: colors.infoBorder,
    borderRadius: radius.sm,
  },
  pressed: { opacity: 0.85 },
  tile: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.iconTile,
    borderWidth: 1,
    borderColor: colors.infoBorder,
    borderRadius: radius.sm,
  },
  texts: { flex: 1, gap: 2 },
  title: { ...text.heading12, color: colors.infoText },
  description: { ...text.body11, color: colors.textMuted },
  chevron: { ...text.strong15, color: colors.infoText },
});
