import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, TextStyle } from 'react-native';

interface GhostDef {
  dx: number; dy: number;
  minScale: number;
  peakOpacity: number; dimOpacity: number;
  delay: number;
}

interface Props {
  text: string;
  textStyle?: TextStyle;
  ghosts?: GhostDef[];
}

// Left / top panel offsets (compact)
export const GHOSTS_PANEL: GhostDef[] = [
  { dx: -28, dy: -18, minScale: 0.88, peakOpacity: 0.55, dimOpacity: 0.30, delay:   0 },
  { dx:  32, dy: -14, minScale: 0.90, peakOpacity: 0.45, dimOpacity: 0.25, delay:  50 },
  { dx: -22, dy:  20, minScale: 0.85, peakOpacity: 0.50, dimOpacity: 0.20, delay: 100 },
  { dx:  26, dy:  16, minScale: 0.90, peakOpacity: 0.40, dimOpacity: 0.20, delay: 150 },
  { dx:   0, dy: -30, minScale: 0.82, peakOpacity: 0.35, dimOpacity: 0.15, delay:  80 },
];

// Bottom panel offsets (wider drift)
export const GHOSTS_BOTTOM: GhostDef[] = [
  { dx: -52, dy: -28, minScale: 0.88, peakOpacity: 0.55, dimOpacity: 0.30, delay:   0 },
  { dx:  56, dy: -22, minScale: 0.90, peakOpacity: 0.45, dimOpacity: 0.25, delay:  50 },
  { dx: -38, dy:  34, minScale: 0.85, peakOpacity: 0.50, dimOpacity: 0.20, delay: 100 },
  { dx:  44, dy:  28, minScale: 0.90, peakOpacity: 0.40, dimOpacity: 0.20, delay: 150 },
  { dx:   0, dy: -48, minScale: 0.82, peakOpacity: 0.35, dimOpacity: 0.15, delay:  80 },
];

export default function GhostWordmark({ text, textStyle, ghosts = GHOSTS_PANEL }: Props) {
  const anims = useRef(ghosts.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    ghosts.forEach((g, i) => {
      Animated.timing(anims[i], {
        toValue: 1,
        duration: 2400,
        delay: g.delay,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <>
      {ghosts.map((g, i) => {
        const a = anims[i];
        // Keyframe positions: t=0 origin, t=0.15 fading in, t=0.55 max drift, t=1 back to origin
        const midX = g.dx * (0.15 / 0.55);
        const midY = g.dy * (0.15 / 0.55);
        const midScale = 1 + (g.minScale - 1) * (0.15 / 0.55);

        const translateX = a.interpolate({ inputRange: [0, 0.15, 0.55, 1], outputRange: [0, midX, g.dx, 0] });
        const translateY = a.interpolate({ inputRange: [0, 0.15, 0.55, 1], outputRange: [0, midY, g.dy, 0] });
        const scale      = a.interpolate({ inputRange: [0, 0.15, 0.55, 1], outputRange: [1, midScale, g.minScale, 1] });
        const opacity    = a.interpolate({ inputRange: [0, 0.15, 0.55, 1], outputRange: [0, g.peakOpacity, g.dimOpacity, 0] });

        return (
          <Animated.Text
            key={i}
            aria-hidden
            style={[
              styles.ghost,
              textStyle,
              { opacity, transform: [{ translateX }, { translateY }, { scale }] },
            ]}
          >
            {text}
          </Animated.Text>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  ghost: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
