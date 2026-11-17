import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../theme';
import { BrandMark } from './BrandMark';

const SIZE = 103;
const STROKE = 2;
const RADIUS = SIZE / 2 - STROKE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** El arco de luz del diseño abarca 315° (5,5 rad) y empieza a los 210°. */
const ARC = CIRCUMFERENCE * (315 / 360);

/** Spinner circular de procesamiento: pista, arco de luz giratorio y símbolo central. */
export function Spinner() {
  const [spin] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 1400, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel="Analizando la cuenta">
      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke={colors.border} strokeWidth={STROKE} fill="none" />
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate }] }]}>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <LinearGradient id="arc" x1="0" y1="0" x2={SIZE} y2={SIZE} gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={colors.blue} stopOpacity={0} />
              <Stop offset="0.5" stopColor={colors.blue} stopOpacity={1} />
              <Stop offset="1" stopColor={colors.spinnerLight} stopOpacity={1} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="url(#arc)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
            transform={`rotate(210 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
      </Animated.View>
      <BrandMark size={33} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
});
