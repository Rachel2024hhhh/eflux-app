import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, F, S } from '../constants/theme';

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

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: S.bottomBarHeight,
    backgroundColor: C.panelLeftBg,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: S.sideStrip + 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  label: {
    fontFamily: F.medium,
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
