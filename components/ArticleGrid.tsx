import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { F } from '../constants/theme';
import { ARTICLES } from '../constants/data';

const CARD_W = 200;
const HALF = CARD_W / 2;

const GRID_ARTICLES = ARTICLES.filter(a => a.image);

export default function ArticleGrid() {
  return (
    <View style={styles.root}>
      <Text style={styles.sectionLabel}>ARTISTIC EXPLORATION · ISSUE 142</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {GRID_ARTICLES.map((a) => (
          <View key={a.id} style={styles.card}>
            {/* Split mosaic: same image shown as left half + right half */}
            <View style={styles.imgRow}>
              {/* Left crop — shows left half of image */}
              <View style={styles.crop}>
                <Image
                  source={a.image}
                  style={styles.imgLeft}
                  resizeMode="cover"
                />
              </View>
              {/* Right crop — shows right half of image */}
              <View style={styles.crop}>
                <Image
                  source={a.image}
                  style={styles.imgRight}
                  resizeMode="cover"
                />
              </View>
            </View>

            <Text style={[styles.label, { color: a.accent }]}>
              {a.category.toUpperCase()}
            </Text>
            <Text style={styles.title}>{a.title}</Text>
            {a.artist ? (
              <Text style={[styles.artist, { color: a.accent }]}>{a.artist}</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    backgroundColor: '#0a0a0a',
  },
  sectionLabel: {
    fontSize: 8,
    letterSpacing: 2,
    color: '#666',
    fontFamily: F.medium,
    marginBottom: 16,
  },
  row: {
    gap: 20,
    paddingRight: 18,
  },
  card: {
    width: CARD_W,
  },
  imgRow: {
    flexDirection: 'row',
    height: 120,
    gap: 2,
    marginBottom: 12,
  },
  crop: {
    flex: 1,
    overflow: 'hidden',
  },
  imgLeft: {
    width: CARD_W,
    height: 120,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  imgRight: {
    width: CARD_W,
    height: 120,
    position: 'absolute',
    left: -HALF,
    top: 0,
  },
  label: {
    fontSize: 8,
    letterSpacing: 2,
    fontFamily: F.medium,
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontFamily: F.bold,
    color: '#ffffff',
    lineHeight: 19,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  artist: {
    fontSize: 9,
    letterSpacing: 1.8,
    fontFamily: F.medium,
    textTransform: 'uppercase',
  },
});
