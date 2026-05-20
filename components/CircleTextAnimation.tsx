import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { C, F } from '../constants/theme';

interface Props {
  text: string;
  height?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onDone?: () => void;
}

// Each ring: base radius, speed multiplier (negative = reverse), and opacity
const RINGS = [
  { radius: 30,  speed:  1.0,  alpha: 1.0 },
  { radius: 46,  speed: -0.7,  alpha: 1.0 },
  { radius: 62,  speed:  0.5,  alpha: 1.0 },
  { radius: 78,  speed: -0.35, alpha: 1.0 },
];

const SPIN_DURATION   = 1600;
const COLLAPSE_DURATION = 560;
const HOLD_DURATION   = 420;
const CLOSE_DURATION  = 360;

const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeIn    = (t: number) => t * t * t;

type Phase = 'spin' | 'collapse' | 'done';

export default function CircleTextAnimation({ text, height = 220, style, textStyle, onDone }: Props) {
  const chars = text.split('');
  const n = chars.length;

  // angle = base rotation progress; expansion = ring scale (1→0 on collapse)
  const [frame, setFrame] = useState({ angle: 0, expansion: 1, charOpacity: 1, tangentialScale: 1 });
  const phaseRef      = useRef<Phase>('spin');
  const phaseStartRef = useRef<number | null>(null);
  const rafRef        = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const h2Opacity = useRef(new Animated.Value(0)).current;
  const wrapHeight = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    const loop = (ts: number) => {
      if (phaseStartRef.current === null) phaseStartRef.current = ts;
      const elapsed = ts - phaseStartRef.current;

      if (phaseRef.current === 'spin') {
        const t = Math.min(elapsed / SPIN_DURATION, 1);
        setFrame({ angle: easeInOut(t) * Math.PI * 2, expansion: 1, charOpacity: 1, tangentialScale: 1 });
        if (t >= 1) {
          phaseRef.current = 'collapse';
          phaseStartRef.current = ts;
        }
      } else if (phaseRef.current === 'collapse') {
        const t = Math.min(elapsed / COLLAPSE_DURATION, 1);
        const e = easeIn(t);
        setFrame({ angle: Math.PI * 2, expansion: 1 - e, charOpacity: 1, tangentialScale: 1 - e });
        if (t >= 1) {
          phaseRef.current = 'done';
          Animated.sequence([
            Animated.timing(h2Opacity, {
              toValue: 1,
              duration: 380,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.delay(HOLD_DURATION),
            Animated.timing(wrapHeight, {
              toValue: 0,
              duration: CLOSE_DURATION,
              easing: Easing.in(Easing.quad),
              useNativeDriver: false,
            }),
          ]).start(() => onDone?.());
          return;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isDone = phaseRef.current === 'done';
  const { angle, expansion, charOpacity, tangentialScale } = frame;

  return (
    <Animated.View style={[styles.wrapper, style, { height: wrapHeight, overflow: 'hidden' }]}>
      {/* h2 — hidden until collapse, then fades in */}
      <Animated.Text style={[styles.h2, textStyle, { opacity: h2Opacity }]}>
        {text}
      </Animated.Text>

      {/* Concentric spinning rings */}
      {!isDone && (
        <View style={[StyleSheet.absoluteFill, styles.circleLayer]} pointerEvents="none">
          {RINGS.map((ring, ri) => {
            const r = ring.radius * expansion;
            const ringAngle = angle * ring.speed;
            return chars.map((char, i) => {
              const theta = (2 * Math.PI * i / n) - Math.PI / 2 + ringAngle;
              const x = r * Math.cos(theta);
              const y = r * Math.sin(theta);
              // Chars face outward (tangential) during spin, rotate upright during collapse
              const rot = (theta + Math.PI / 2) * tangentialScale;
              return (
                <Text
                  key={`${ri}-${i}`}
                  style={[
                    styles.char,
                    textStyle,
                    { opacity: charOpacity * ring.alpha,
                      transform: [{ translateX: x }, { translateY: y }, { rotate: `${rot}rad` }] },
                  ]}
                >
                  {char}
                </Text>
              );
            });
          })}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.panelLeftBg,
  },
  h2: {
    fontFamily: F.display,
    fontSize: 22,
    color: C.yellow,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  circleLayer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  char: {
    position: 'absolute',
    fontFamily: F.display,
    fontSize: 11,
    color: C.yellow,
    letterSpacing: 0,
  },
});
