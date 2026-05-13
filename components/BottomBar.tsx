import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { C, F } from '../constants/theme';

export type PanelContent = 'browse' | 'about' | 'info' | null;

interface Props {
  active: PanelContent;
  onFeed: () => void;
  onBrowse: () => void;
  onAbout: () => void;
  onInfo: () => void;
}

const TABS: { id: PanelContent; label: string }[] = [
  { id: null, label: 'Feed' },
  { id: 'browse', label: 'Browse' },
  { id: 'about', label: 'About' },
  { id: 'info', label: 'Info' },
];

export default function BottomBar({ active, onFeed, onBrowse, onAbout, onInfo }: Props) {
  const handlers: Record<string, () => void> = {
    feed: onFeed,
    browse: onBrowse,
    about: onAbout,
    info: onInfo,
  };

  const content = (
    <View style={styles.row}>
      {TABS.map((tab) => {
        const key = tab.id ?? 'feed';
        const isActive = active === tab.id;
        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={handlers[key]}
            activeOpacity={0.65}
          >
            {isActive && tab.id !== null && <View style={styles.indicator} />}
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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
  indicator: {
    position: 'absolute',
    top: 0,
    width: 22,
    height: 2,
    backgroundColor: C.efluxBlue,
    borderRadius: 1,
  },
  label: {
    fontFamily: F.medium,
    fontSize: 12,
    color: C.textMid,
    letterSpacing: 0.2,
  },
  labelActive: {
    color: C.efluxBlue,
    fontFamily: F.bold,
  },
});
