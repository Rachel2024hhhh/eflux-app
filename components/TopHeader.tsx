import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { C, F, S } from '../constants/theme';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function TopHeader({ isOpen, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]}>
      <Text style={styles.wordmark}>IFLUX</Text>
      <View style={styles.rightRow}>
        <Text style={styles.issue}>e‑flux · Spring 2026</Text>
        <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>▾</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: S.topHeaderHeight,
    backgroundColor: C.yellow,
    paddingHorizontal: S.sideStrip + 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordmark: {
    fontFamily: F.display,
    fontSize: 20,
    color: C.panelLeftBg,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  issue: {
    fontFamily: F.regular,
    fontSize: 10,
    color: C.panelLeftBg,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  chevron: {
    fontSize: 14,
    color: C.panelLeftBg,
    lineHeight: 16,
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
});
