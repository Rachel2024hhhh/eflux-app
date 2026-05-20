import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { C, F } from '../constants/theme';

interface Props {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onDone?: () => void;
}

const RADIUS = 56;
const SPIN_DURATION = 1300;
const COLLAPSE_DURATION = 520;

// Easing helpers
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeIn = (t: number) => t * t * t;

type Phase = 'spin' | 'collapse' | 'done';

export default function CircleTextAnimation({ text, style, textStyle, onDone }: Props) {
  const chars = text.split('');
  const n = chars.length;

  const [frame, setFrame] = useState({ angle: 0, radius: RADIUS, opacity: 1 });
  const phaseRef = useRef<Phase>('spin');
  const phaseStartRef = useRef<number | null>(null);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  // Fade-in for the h2 after animation
  const h2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (ts: number) => {
      if (phaseStartRef.current === null) phaseStartRef.current = ts;
      const elapsed = ts - phaseStartRef.current;

      if (phaseRef.current === 'spin') {
        const t = Math.min(elapsed / SPIN_DURATION, 1);
        setFrame({ angle: easeInOut(t) * Math.PI * 2, radius: RADIUS, opacity: 1 });
        if (t >= 1) {
          phaseRef.current = 'collapse';
          phaseStartRef.current = ts;
        }
      } else if (phaseRef.current === 'collapse') {
        const t = Math.min(elapsed / COLLAPSE_DURATION, 1);
        const e = easeIn(t);
        setFrame({ angle: Math.PI * 2, radius: RADIUS * (1 - e), opacity: 1 - e });
        if (t >= 1) {
          phaseRef.current = 'done';
          // Fade h2 in
          Animated.timing(h2Opacity, {
            toValue: 1,
            duration: 380,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start(() => onDone?.());
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
  const { angle, radius, opacity } = frame;

  return (
    <View style={[styles.wrapper, style]}>
      {/* h2 — hidden until onDone, then fades in */}
      <Animated.Text style={[styles.h2, textStyle, { opacity: h2Opacity }]}>
        {text}
      </Animated.Text>

      {/* Spinning circle overlay */}
      {!isDone && (
        <View style={[StyleSheet.absoluteFill, styles.circleLayer]} pointerEvents="none">
          {chars.map((char, i) => {
            const theta = (2 * Math.PI * i / n) - Math.PI / 2 + angle;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            return (
              <Text
                key={i}
                style={[
                  styles.char,
                  textStyle,
                  {
                    opacity,
                    transform: [{ translateX: x }, { translateY: y }],
                  },
                ]}
              >
                {char}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  h2: {
    fontFamily: F.display,
    fontSize: 28,
    color: C.white,
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
    fontSize: 28,
    color: C.yellow,
    letterSpacing: -0.5,
  },
});
