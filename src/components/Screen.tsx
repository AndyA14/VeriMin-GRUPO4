import React from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout } from '../theme';
import { NavBar } from './NavBar';

interface Props {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  overlay?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Contenedor de pantalla: fondo, safe areas, barra de navegación, scroll y pie fijo. */
export function Screen({ title, children, footer, overlay, contentStyle }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      {title ? <NavBar title={title} /> : null}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          { paddingHorizontal: layout.screenX, paddingBottom: footer ? 24 : insets.bottom + 24 },
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {footer ? (
        <View style={{ paddingHorizontal: layout.screenX, paddingTop: 12, paddingBottom: insets.bottom + 16 }}>{footer}</View>
      ) : null}
      {overlay}
    </View>
  );
}
