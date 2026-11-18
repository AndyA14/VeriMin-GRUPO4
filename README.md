# VeriMind Analytics — Expo (React Native)

**Integrantes del Grupo:** Andrés Aucanela, Carlos Patiño, Joseph Ponce y Petter Rodriguez

Código de las **16 pantallas móviles** del archivo de Figma «Moviles» (`Wyt8RCSYYWKs4xzLd5ptPF`), frames de 393×852.
Solo la app: no incluye las láminas de negocio ni las páginas del sistema de diseño.

---

## IA utilizadas por los integrantes del Grupo

- **Andy:** Claude Sonet 5.5 y Gemini Flash 3.8
- **Carlos:** Claude Sonet 5.5
- **Joseph:** Claude Opus 5.5
- **Petter:** Gemini Argon

---

## Stack y versiones instaladas

- **Expo SDK:** `~58.0.25`
- **Expo Router:** `~58.0.31`
- **React / React Native:** `19.3.0` / `0.88.1`
- **TypeScript:** `~6.0.3`
- **UI e Iconografía:** `lucide-react-native`, `react-native-svg`, `@expo-google-fonts/inter`

---

## 1. Instalación en un entorno nuevo

El proyecto ya cuenta con su estructura base y `package.json` configurados en la raíz. Si clonas el repositorio desde cero, instala las dependencias con:

```bash
npm install
```

*(Nota: si ocurre algún conflicto de peer dependencies entre versiones de `react` y `react-dom`, ejecuta `npm install --legacy-peer-deps` o `npx expo install --fix`).*

---

## 2. Configuración de Expo Router (ya aplicada)

- En `package.json`: `"main": "expo-router/entry"` (asegurarse de no dejar `"index.ts"` duplicado).
- En `app.json`, dentro de `"expo"`: `"scheme": "verimind"`, `"userInterfaceStyle": "dark"` y `"plugins": ["expo-router"]`.
- Los archivos base `App.tsx` e `index.ts` del template inicial fueron eliminados para usar el enrutamiento basado en archivos dentro de `src/app/`.

---

## 3. Reemplazar las imágenes provisionales

Las imágenes de `assets/images/` son degradados provisionales. Expórtalas desde Figma (PNG @3x) con estos nombres:

| Archivo               | Capa en Figma                                                             |
|-----------------------|---------------------------------------------------------------------------|
| `profile.png`         | `Foto de perfil` (70:148) — 88×123                                         |
| `login-hero.png`      | Imagen de `Fotografía editorial` (22:803) — sin la capa de texto           |
| `post-1/2/3.png`      | `Fotografía ilustrativa en carga` (22:870, 22:873, 22:876) — sin desenfoque |

El desenfoque (1,5) y la opacidad (70 %) de las miniaturas ya los aplica el código.

---

## 4. Ejecutar la aplicación

Usa siempre `npx expo` (el CLI global `expo` está deprecado):

```bash
npx expo start
```

Comandos adicionales disponibles en `package.json`:
- `npm run android` — Inicia el servidor y abre en Android / emulador.
- `npm run ios` — Inicia el servidor y abre en iOS (macOS).
- `npm run web` — Inicia la versión web.

---

## 5. Notas del entorno de desarrollo (Windows / Git)

- **Identidad de Git:** Antes de realizar commits en una máquina nueva, configurar nombre y correo (`git config --global user.name "..."` y `git config --global user.email "..."`).
- **Terminal Git Bash (`MINGW64`):** Para pegar comandos en la terminal de VS Code, usar **clic derecho** o `Shift + Insert` (evitar `Ctrl + V`, ya que inserta `^V`).
- **Finales de línea (LF/CRLF):** Git en Windows convertirá automáticamente LF a CRLF al tocar los archivos de `src/`.

---

## Mapa pantalla → archivo

| Frame de Figma                                  | Ruta / archivo                      |
|-------------------------------------------------|-------------------------------------|
| Login corporativo                               | `src/app/index.tsx`                 |
| Búsqueda y extracción                           | `src/app/buscar.tsx`                |
| Procesamiento 1/3, 2/3, 3/3                     | `src/app/procesando.tsx`            |
| Resultado del análisis                          | `src/app/resultado.tsx`             |
| Asistente                                       | `src/app/chat.tsx`                  |
| Informe para la empresa (IA)                    | `src/app/informe.tsx`               |
| Apoyo al creador (acoso / tono / malestar)      | `src/app/apoyo.tsx`                 |
| Recursos de apoyo (panel)                       | `BottomSheet` dentro de `apoyo.tsx` |
| Público del creador                             | `src/app/publico.tsx`               |
| Planes                                          | `src/app/planes.tsx`                |
| Pago                                            | `src/app/pago.tsx`                  |
| Reporte generado / Plan activado (avisos)       | `src/state/AppState.tsx`            |

**Flujo:** Login → Búsqueda → Procesamiento → Resultado → (Chat · Informe · Público · Apoyo). Búsqueda → Planes → Pago.
El flujo se dedujo de los nombres de los frames (los enlaces de prototipo de Figma no se pudieron leer).

---

## Estructura del proyecto

```text
assets/
  images/               Recursos gráficos (login-hero, post-1/2/3, profile) e íconos de app
src/
  theme/index.ts        Colores, tipografía (Inter), radios y tonos (info/peligro/advertencia/éxito)
  data/content.ts       Textos y datos de ejemplo de todas las pantallas
  state/AppState.tsx    Plan actual y avisos de confirmación
  components/           Átomos, moléculas y organismos (Button, Field, StatusTag, Card, IconRow,
                        ActionCard, AlertCard, StackedBar, Spinner, BottomSheet, NavBar, Screen…)
  app/                  Pantallas (Expo Router)
package.json            Dependencias y scripts del proyecto
app.json                Configuración de Expo
tsconfig.json           Configuración de TypeScript
```

---

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