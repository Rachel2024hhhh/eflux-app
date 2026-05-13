import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { C, F } from '../constants/theme';
import { Article } from '../constants/data';

export default function ArticleCard({ item }: { item: Article }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: item.bg, opacity: pressed ? 0.88 : 1 },
      ]}
      android_ripple={{ color: item.accent + '33' }}
    >
      {/* Top accent line */}
      <View style={[styles.topLine, { backgroundColor: item.accent }]} />

      <View style={styles.inner}>
        <Text style={[styles.category, { color: item.accent }]}>
          {item.category.toUpperCase()}
        </Text>
        <Text style={styles.title}>{item.title}</Text>

        {item.artist ? (
          <Text style={[styles.artist, { color: item.accent + 'bb' }]}>
            {item.artist}
          </Text>
        ) : null}

        {item.date ? (
          <Text style={styles.meta}>{item.date}</Text>
        ) : null}

        {item.exhibition ? (
          <Text style={styles.meta}>{item.exhibition}</Text>
        ) : null}

        {item.venue ? (
          <Text style={styles.meta}>{item.venue}</Text>
        ) : null}

        <Text style={styles.body}>{item.body}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 2,
    minHeight: 148,
  },
  topLine: {
    height: 2,
  },
  inner: {
    padding: 18,
    paddingTop: 14,
  },
  category: {
    fontFamily: F.medium,
    fontSize: 9,
    letterSpacing: 1.9,
    marginBottom: 9,
  },
  title: {
    fontFamily: F.bold,
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 25,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  artist: {
    fontFamily: F.medium,
    fontSize: 12,
    marginBottom: 3,
  },
  meta: {
    fontFamily: F.regular,
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  body: {
    fontFamily: F.regular,
    fontSize: 13,
    color: '#cccccc',
    lineHeight: 19,
    marginTop: 6,
  },
});
