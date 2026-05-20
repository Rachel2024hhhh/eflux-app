import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { C, F, S } from '../constants/theme';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function BottomBar({ isOpen, onToggle }: Props) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]}
    >
      <Text style={styles.label}>Info · Contact · Archive</Text>
      <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>▾</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: S.bottomBarHeight,
    backgroundColor: C.yellow,
    paddingHorizontal: S.sideStrip + 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: F.medium,
    fontSize: 9,
    color: C.panelLeftBg,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
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
