import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { Screen } from '../components/Screen';
import { Spinner } from '../components/Spinner';
import { processingStages } from '../data/content';
import { colors, radius, text } from '../theme';

const STAGE_MS = 2400;

const thumbs = [
  require('../../assets/images/post-1.png'),
  require('../../assets/images/post-2.png'),
  require('../../assets/images/post-3.png'),
];

/** VeriMind · Procesamiento 1/3, 2/3 y 3/3 (una sola pantalla que avanza sola). */
export default function ProcessingScreen() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const progress = useRef(new Animated.Value(processingStages[0].progress)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: processingStages[stage].progress,
      duration: 700,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      if (stage < processingStages.length - 1) setStage(stage + 1);
      else router.replace('/resultado');
    }, STAGE_MS);

    return () => clearTimeout(timer);
  }, [stage, progress, router]);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <Screen contentStyle={styles.content}>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <Logo />

      <View style={[styles.status, { marginTop: 49 }]}>
        <Text style={styles.title}>Cada señal cuenta.</Text>
        <Text style={styles.description}>Preparando una visión más clara del perfil.</Text>
      </View>

      <View style={{ marginTop: 77 }}>
        <Spinner />
      </View>

      <View style={[styles.card, { marginTop: 61 }]}>
        <View style={styles.thumbs}>
          {thumbs.map((source, index) => (
            <View key={index} style={styles.thumb}>
              <Image source={source} style={styles.thumbImage} blurRadius={1.5} accessibilityElementsHidden />
              <View style={styles.marker} />
            </View>
          ))}
        </View>
        <Text style={styles.message} accessibilityLiveRegion="polite">
          {processingStages[stage].message}
        </Text>
        <View style={styles.track} accessibilityRole="progressbar" accessibilityLabel={`Paso ${stage + 1} de 3`}>
          <Animated.View style={[styles.fill, { width }]} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 23 },
  status: { gap: 10 },
  title: { ...text.display29, color: colors.text },
  description: { ...text.body13, color: colors.textMuted },
  card: {
    minHeight: 278,
    padding: 18,
    gap: 21,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  thumbs: { flexDirection: 'row', gap: 9 },
  thumb: { flex: 1, gap: 8 },
  thumbImage: { height: 119, borderRadius: radius.sm, opacity: 0.7, width: '100%', backgroundColor: colors.surface },
  marker: { width: 59, height: 4, borderRadius: 4, backgroundColor: colors.skeleton },
  message: { ...text.medium14, lineHeight: 20.3, color: colors.text },
  track: { height: 2, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: 2, backgroundColor: colors.blue },
});
