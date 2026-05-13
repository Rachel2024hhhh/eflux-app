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
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]}>
      {/* Brand row */}
      <View style={styles.brandRow}>
        <Text style={styles.wordmark}>e&#8209;flux</Text>
        <View style={styles.rightRow}>
          <Text style={styles.issue}>Spring 2026 · Issue 142</Text>
          <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>▾</Text>
        </View>
      </View>
      {/* Yellow accent bar */}
      <View style={styles.accentBar} />
      {/* Featured teaser */}
      <View style={styles.featured}>
        <Text style={styles.featuredLabel}>FEATURED</Text>
        <Text style={styles.featuredTitle} numberOfLines={1}>{featured.title}</Text>
        <Text style={styles.featuredMeta} numberOfLines={1}>
          {featured.artist}{featured.exhibition ? ` · ${featured.exhibition}` : ''}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: C.bgMain,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  wordmark: {
    fontFamily: F.bold,
    fontSize: 27,
    color: C.efluxBlue,
    letterSpacing: -0.6,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  issue: {
    fontFamily: F.regular,
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 0.4,
  },
  chevron: {
    fontSize: 16,
    color: C.efluxBlue,
    lineHeight: 18,
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  accentBar: {
    height: 3,
    backgroundColor: C.yellow,
    marginHorizontal: -16,
    marginBottom: 9,
  },
  featured: {},
  featuredLabel: {
    fontFamily: F.medium,
    fontSize: 9,
    color: C.textMuted,
    letterSpacing: 1.6,
    marginBottom: 3,
  },
  featuredTitle: {
    fontFamily: F.bold,
    fontSize: 14,
    color: C.textMain,
    letterSpacing: -0.2,
  },
  featuredMeta: {
    fontFamily: F.regular,
    fontSize: 12,
    color: C.textLight,
    marginTop: 2,
  },
});
