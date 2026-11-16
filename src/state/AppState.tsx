import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BadgeCheck } from 'lucide-react-native';
import type { PlanId } from '../data/content';
import { colors, layout, radius, text, tones } from '../theme';

export type CurrentPlan = 'trial' | PlanId;

interface AppState {
  plan: CurrentPlan;
  setPlan: (plan: CurrentPlan) => void;
  /** Muestra un aviso de confirmación en la parte superior. */
  notify: (message: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<CurrentPlan>('trial');
  const [message, setMessage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback(
    (next: string) => {
      if (timer.current) clearTimeout(timer.current);
      setMessage(next);
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      timer.current = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }).start(() => setMessage(null));
      }, 2600);
    },
    [opacity],
  );

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const value = useMemo(() => ({ plan, setPlan, notify }), [plan, notify]);
  const tone = tones.success;

  return (
    <AppContext.Provider value={value}>
      {children}
      {message ? (
        <Animated.View
          pointerEvents="none"
          accessibilityLiveRegion="polite"
          style={[
            styles.toast,
            { top: insets.top + 11, opacity, backgroundColor: tone.bg, borderColor: tone.border },
          ]}
        >
          <BadgeCheck size={17} color={colors.successText} strokeWidth={1.5} absoluteStrokeWidth />
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      ) : null}
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: layout.screenX,
    right: layout.screenX,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  toastText: { ...text.label13, flex: 1, color: colors.successText },
});
