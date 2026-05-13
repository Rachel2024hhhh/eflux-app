import React from 'react';
import { View, StyleSheet } from 'react-native';
import { C, S } from '../constants/theme';

export default function GlassStrip({ side }: { side: 'left' | 'right' }) {
  return <View style={styles.strip} />;
}

const styles = StyleSheet.create({
  strip: {
    width: S.sideStrip,
    backgroundColor: C.efluxBlue,
  },
});
