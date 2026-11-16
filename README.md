# VeriMind Analytics — Expo (React Native)

Código de las **16 pantallas móviles** del archivo de Figma «Moviles» (`Wyt8RCSYYWKs4xzLd5ptPF`), frames de 393×852.
Solo la app: no incluye las láminas de negocio ni las páginas del sistema de diseño.

## 1. Crear el proyecto

```bash
npx create-expo-app@latest verimind --template blank-typescript
cd verimind
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-font react-native-svg
npm install lucide-react-native @expo-google-fonts/inter
```

## 2. Configurar Expo Router

- En `package.json`: `"main": "expo-router/entry"`
- En `app.json`, dentro de `"expo"`: `"scheme": "verimind"`, `"userInterfaceStyle": "dark"` y `"plugins": ["expo-router"]`
- Borra `App.tsx` e `index.ts` del template.

## 3. Copiar este paquete

Copia las carpetas `src/` y `assets/` dentro del proyecto.

## 4. Reemplazar las imágenes provisionales

Las imágenes de `assets/images/` son degradados provisionales. Expórtalas desde Figma (PNG @3x) con estos nombres:

| Archivo               | Capa en Figma                                                             |
|-----------------------|---------------------------------------------------------------------------|
| `profile.png`         | `Foto de perfil` (70:148) — 88×123                                         |
| `login-hero.png`      | Imagen de `Fotografía editorial` (22:803) — sin la capa de texto           |
| `post-1/2/3.png`      | `Fotografía ilustrativa en carga` (22:870, 22:873, 22:876) — sin desenfoque |

El desenfoque (1,5) y la opacidad (70 %) de las miniaturas ya los aplica el código.

## 5. Ejecutar

```bash
npx expo start
```

## Mapa pantalla → archivo

| Frame de Figma                                  | Ruta / archivo               |
|-------------------------------------------------|------------------------------|
| Login corporativo                               | `src/app/index.tsx`          |
| Búsqueda y extracción                           | `src/app/buscar.tsx`         |
| Procesamiento 1/3, 2/3, 3/3                     | `src/app/procesando.tsx`     |
| Resultado del análisis                          | `src/app/resultado.tsx`      |
| Asistente                                       | `src/app/chat.tsx`           |
| Informe para la empresa (IA)                    | `src/app/informe.tsx`        |
| Apoyo al creador (acoso / tono / malestar)      | `src/app/apoyo.tsx`          |
| Recursos de apoyo (panel)                       | `BottomSheet` dentro de `apoyo.tsx` |
| Público del creador                             | `src/app/publico.tsx`        |
| Planes                                          | `src/app/planes.tsx`         |
| Pago                                            | `src/app/pago.tsx`           |
| Reporte generado / Plan activado (avisos)       | `src/state/AppState.tsx`     |

Flujo: Login → Búsqueda → Procesamiento → Resultado → (Chat · Informe · Público · Apoyo). Búsqueda → Planes → Pago.
El flujo se dedujo de los nombres de los frames (los enlaces de prototipo de Figma no se pudieron leer).

## Estructura

```
src/theme/index.ts      Colores, tipografía (Inter), radios y tonos (info/peligro/advertencia/éxito)
src/data/content.ts     Textos y datos de ejemplo de todas las pantallas
src/state/AppState.tsx  Plan actual y avisos de confirmación
src/components/         Átomos, moléculas y organismos (Button, Field, StatusTag, Card, IconRow,
                        ActionCard, AlertCard, StackedBar, Spinner, BottomSheet, NavBar, Screen…)
src/app/                Pantallas (Expo Router)
```

## Decisiones de implementación (revisar)

- **Botón flotante del chat:** en Figma está dentro del flujo vertical y queda en el borde izquierdo (x=0); en código va abajo a la derecha, junto a la nota.
- **Procesamiento:** las tres pantallas son una sola que avanza sola (2,4 s por paso) y pasa a Resultado. La barra de progreso usa 113, 200 y 290 de 309 px.
- **Spinner:** el degradado angular del arco se aproxima con un degradado lineal.
- **Color de botones:** se usó `#3B82F6` como en los frames. El sistema de diseño indica `#2563EB` para mejor contraste con texto blanco; se cambia en `colors.button`.
- **Plan actual:** se añadió un estado mínimo. Al pagar, el chip de la pantalla de búsqueda pasa de «Prueba gratuita» a «Plan … · activo».
- **Chat:** al enviar se agrega tu mensaje y una respuesta de ejemplo fija. No hay IA conectada.
- **PDF:** los botones de descarga solo muestran el aviso «Reporte de verificación generado (PDF)»; no generan archivo.
- **Datos:** todo es de ejemplo (cuenta `@carlospati`); lo escrito en el buscador no cambia el resultado.
- **Pago:** los campos son de ejemplo y no se guardan ni se envían.
