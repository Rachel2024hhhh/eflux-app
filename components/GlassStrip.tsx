import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { C } from '../constants/theme';

export default function GlassStrip({ side }: { side: 'left' | 'right' }) {
  const borderStyle =
    side === 'left'
      ? { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: C.efluxBlue + '50' }
      : { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: C.efluxBlue + '50' };

  if (Platform.OS === 'android') {
    return <View style={[styles.strip, borderStyle, { backgroundColor: C.efluxBlue + '12' }]} />;
  }

  return (
    <BlurView intensity={18} tint="light" style={[styles.strip, borderStyle]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: C.efluxBlue + '0e' }]} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  strip: {
    width: 7,
  },
});
