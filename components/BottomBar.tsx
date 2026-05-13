import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { C, F } from '../constants/theme';

const LABELS = ['Index', 'Projects', 'Artists', 'Events'];

export default function BottomBar() {
  const content = (
    <View style={styles.row}>
      {LABELS.map((label) => (
        <View key={label} style={styles.tab}>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <View style={[styles.container, { backgroundColor: C.bgMain }]}>
        {content}
      </View>
    );
  }

  return (
    <BlurView intensity={70} tint="light" style={styles.container}>
      {content}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.border,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  label: {
    fontFamily: F.regular,
    fontSize: 12,
    color: C.textMuted,
    letterSpacing: 0.2,
  },
});
