import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { C, F, S } from '../constants/theme';

// Characters stacked vertically to spell out the ticker
const CHARS = Array.from('E·F·L·U·X · E·F·L·U·X · ');
const CHAR_H = 10; // height per character cell
const SEGMENT_H = CHARS.length * CHAR_H;

function TickerColumn({ side }: { side: 'left' | 'right' }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: -SEGMENT_H,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const column = [...CHARS, ...CHARS]; // duplicate for seamless loop

  return (
    <Animated.View style={{ transform: [{ translateY: anim }] }}>
      {column.map((ch, i) => (
        <Text key={i} style={styles.char}>{ch}</Text>
      ))}
    </Animated.View>
  );
}

export default function GlassStrip({ side }: { side: 'left' | 'right' }) {
  return (
    <View style={styles.strip}>
      <TickerColumn side={side} />
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    width: S.sideStrip,
    backgroundColor: C.panelLeftBg,
    overflow: 'hidden',
    alignItems: 'center',
  },
  char: {
    color: 'rgba(255,255,255,1)',
    fontSize: 7,
    fontFamily: F.medium,
    lineHeight: CHAR_H,
    textAlign: 'center',
    width: S.sideStrip,
  },
});
