import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { C, F } from '../constants/theme';
import { ARTICLES } from '../constants/data';

const featured = ARTICLES[0];

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function TopHeader({ isOpen, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.container, pressed && { opacity: 0.88 }]}>
      {/* Brand row */}
      <View style={styles.brandRow}>
        <Text style={styles.wordmark}>IFLUX</Text>
        <View style={styles.rightRow}>
          <Text style={styles.issue}>Spring 2026 · Issue 142</Text>
          <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>▾</Text>
        </View>
      </View>
      {/* Featured teaser */}
      <View style={styles.featured}>
        <Text style={styles.featuredLabel}>FEATURED  NOW OPEN</Text>
        <Text style={styles.featuredTitle} numberOfLines={1}>e‑flux / Spring 2026</Text>
        <Text style={styles.featuredMeta} numberOfLines={2}>
          New contributions from artists, theorists, and practitioners exploring the intersection of architecture, technology, and the politics of space.
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: C.yellow,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  wordmark: {
    fontFamily: F.display,
    fontSize: 34,
    color: C.efluxBlue,
    letterSpacing: -0.5,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  issue: {
    fontFamily: F.regular,
    fontSize: 10,
    color: C.blueMid,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  chevron: {
    fontSize: 16,
    color: C.efluxBlue,
    lineHeight: 18,
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  featured: {},
  featuredLabel: {
    fontFamily: F.medium,
    fontSize: 9,
    color: C.blueMid,
    letterSpacing: 1.8,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    fontFamily: F.bold,
    fontSize: 15,
    color: C.efluxBlue,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  featuredMeta: {
    fontFamily: F.regular,
    fontSize: 12,
    color: C.blueMid,
    lineHeight: 17,
  },
});
