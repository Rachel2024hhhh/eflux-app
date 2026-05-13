import React from 'react';
import { View, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export default function GlassStrip({ side }: { side: 'left' | 'right' }) {
  return <View style={styles.strip} />;
}

const styles = StyleSheet.create({
  strip: {
    width: 14,
    backgroundColor: C.efluxBlue,
  },
});
