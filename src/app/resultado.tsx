import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionCard } from '../components/ActionCard';
import { AlertCard } from '../components/AlertCard';
import { Card } from '../components/Card';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { Screen } from '../components/Screen';
import { StatusTag } from '../components/StatusTag';
import { account } from '../data/content';
import { colors, layout, text } from '../theme';
import { useApp } from '../state/AppState';

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <Card radiusSize={8} style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );
}

/** VeriMind · Resultado del análisis */
export default function ResultScreen() {
  const router = useRouter();
  const { handle } = useApp();
  const insets = useSafeAreaInsets();

  const overlay = (
    <>
      <Text style={[styles.note, { bottom: insets.bottom + 24 }]}>
        Datos y fotografías ilustrativos del prototipo. No representan una auditoría real.
      </Text>
      <Pressable
        onPress={() => router.push('/chat')}
        accessibilityRole="button"
        accessibilityLabel="Abrir chat con el asistente"
        style={({ pressed }) => [styles.fab, { bottom: insets.bottom + 16 }, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.fabIcon}>💬</Text>
      </Pressable>
    </>
  );

  return (
    <Screen title="RESULTADO DEL ANÁLISIS" overlay={overlay} contentStyle={styles.content}>
      <Text style={styles.title}>Análisis del perfil</Text>

      <View style={styles.profile}>
        <ProfilePhoto />
        <View style={styles.identity}>
          <View style={styles.nickBlock}>
            <Text style={styles.nickname}>{handle}</Text>
            <StatusTag tone="danger" label={account.riskLabel} />
          </View>
          <View style={styles.metrics}>
            <Metric value={account.followers} label="Seguidores" />
            <Metric value={account.posts} label="Publicaciones" />
          </View>
        </View>
      </View>

      <View style={styles.signals}>
        <AlertCard
          tone="danger"
          title="¡Anomalía detectada! Posible compra de seguidores/bots"
          detail={`Benford: χ² = ${account.benford.chi2} (crítico: ${account.benford.critical})`}
        />
        <AlertCard
          tone="warning"
          title={`Comentarios hostiles: ${account.hostileComments.count} de ${account.hostileComments.total}`}
          detail="Posible acoso hacia el creador"
        />
      </View>

      <ActionCard
        title="Informe con IA"
        description="Recomendación redactada a partir de los resultados"
        onPress={() => router.push('/informe')}
      />
      <ActionCard
        title="Público del creador"
        description="Quién lo ve y qué tanto compra su audiencia"
        onPress={() => router.push('/publico')}
      />
      <ActionCard
        title="Apoyo al creador"
        description="Guía de apoyo con ejemplos de comentarios"
        onPress={() => router.push('/apoyo')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 14, gap: 23, paddingBottom: 120 },
  title: { ...text.title27, color: colors.text },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  identity: { flex: 1, gap: 12 },
  nickBlock: { gap: 6 },
  nickname: { ...text.nickname, color: colors.text },
  metrics: { flexDirection: 'row', gap: 8 },
  metric: { flex: 1, height: 80, padding: 11, gap: 5 },
  metricValue: { ...text.metric, color: colors.text },
  metricLabel: { ...text.caption10, lineHeight: 13, color: colors.textMuted },
  signals: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  note: {
    position: 'absolute',
    left: layout.screenX,
    width: 262,
    ...text.caption10,
    color: colors.textMuted,
  },
  fab: {
    position: 'absolute',
    right: layout.screenX,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.button,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabIcon: { fontSize: 23 },
});
