import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated, Easing, Platform } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { C, F } from '../constants/theme';
import { Article } from '../constants/data';

const TILES = [0, 1, 2, 3, 4, 5];

export default function ArticleCard({ item, index = 0 }: { item: Article; index?: number }) {
  const [cardW, setCardW] = useState(0);
  const imgH = cardW * 0.4; // aspect ratio 5:2
  const tileW = cardW / 3;
  const tileH = imgH / 2;

  // Desktop-matching reveal: blur(14px)→0, scale(1.05)→1, translateY(8)→0
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!item.image) return;
    Animated.timing(anim, {
      toValue: 1,
      duration: 1400,
      delay: Math.min(index * 180, 720),
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: false,
    }).start();
  }, []);

  const imgScale   = anim.interpolate({ inputRange: [0, 1], outputRange: [1.05, 1] });
  const imgTransY  = anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] });
  const imgOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1] });
  const imgBlur    = anim.interpolate({ inputRange: [0, 1], outputRange: ['blur(14px)', 'blur(0px)'] });

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.92 : 1 }]}
      android_ripple={{ color: '#00000011' }}
      onLayout={e => setCardW(e.nativeEvent.layout.width)}
    >
      {/* ── IMAGE SECTION ── */}
      {cardW > 0 && (
        <View style={[styles.imgSection, { height: imgH, backgroundColor: item.bg }]}>
          {item.image ? (
            /* 3×2 mosaic — each tile focuses on a different region of the image */
            <Animated.View style={[{
              width: cardW, height: imgH, flexDirection: 'row', flexWrap: 'wrap',
              opacity: imgOpacity,
              transform: [{ scale: imgScale }, { translateY: imgTransY }],
            }, Platform.OS === 'web' ? { filter: imgBlur } as any : {}]}>
              {TILES.map(idx => {
                const c = idx % 3;
                const r = Math.floor(idx / 3);
                return (
                  <View
                    key={idx}
                    style={{ width: tileW, height: tileH, overflow: 'hidden' }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        // objectFit + objectPosition mirror the desktop CSS exactly
                        objectFit: 'cover',
                        objectPosition: `${c * 50}% ${r * 100}%`,
                      } as any}
                    />
                  </View>
                );
              })}
            </Animated.View>
          ) : (
            /* No-image placeholder: grid overlay + number watermark + category badge */
            <View style={StyleSheet.absoluteFill}>
              {/* Repeating accent-coloured grid lines, matching desktop */}
              <Svg width={cardW} height={imgH}>
                {Array.from({ length: Math.ceil(cardW / 52) + 1 }, (_, i) => (
                  <Line key={`v${i}`} x1={i * 52} y1={0} x2={i * 52} y2={imgH}
                    stroke={item.accent} strokeOpacity={0.18} strokeWidth={1} />
                ))}
                {Array.from({ length: Math.ceil(imgH / 52) + 1 }, (_, i) => (
                  <Line key={`h${i}`} x1={0} y1={i * 52} x2={cardW} y2={i * 52}
                    stroke={item.accent} strokeOpacity={0.18} strokeWidth={1} />
                ))}
              </Svg>
              <Text style={[styles.watermark, { color: item.accent, position: 'absolute', alignSelf: 'center', top: '10%' }]}>
                {String(item.id).padStart(2, '0')}
              </Text>
              <View style={[styles.badge, { borderColor: item.accent + '66' }]}>
                <Text style={[styles.badgeText, { color: item.accent }]}>
                  {item.category}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* ── TEXT SECTION ── */}
      <View style={styles.textSection}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.title}>{item.title}</Text>

        {item.artist ? (
          <Text style={styles.artist}>{item.artist}</Text>
        ) : null}

        {item.date ? (
          <Text style={styles.date}>{item.date}</Text>
        ) : null}

        {item.exhibition ? (
          <Text style={styles.exhibition}>{item.exhibition}</Text>
        ) : null}

        {item.venue ? (
          <Text style={styles.venue}>{item.venue}</Text>
        ) : null}

        <Text style={styles.body}>{item.body}</Text>
        <View style={styles.rule} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: '#ffffff',
  },
  imgSection: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    fontFamily: F.display,
    fontSize: 110,
    letterSpacing: -4,
    opacity: 0.15,
    lineHeight: 120,
  },
  badge: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: F.medium,
    fontSize: 9,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  textSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    backgroundColor: '#ffffff',
  },
  category: {
    fontFamily: F.medium,
    fontSize: 9,
    letterSpacing: 2,
    color: '#aaaaaa',
    marginBottom: 8,
  },
  title: {
    fontFamily: F.display,
    fontSize: 28,
    letterSpacing: -0.8,
    lineHeight: 31,
    color: '#111111',
    marginBottom: 6,
  },
  artist: {
    fontFamily: F.medium,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: C.panelLeftBg,
    marginBottom: 14,
  },
  date: {
    fontFamily: F.medium,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#aaaaaa',
    marginBottom: 4,
  },
  exhibition: {
    fontFamily: F.medium,
    fontSize: 11,
    letterSpacing: 0.8,
    color: C.panelLeftBg,
    marginBottom: 16,
  },
  venue: {
    fontFamily: F.regular,
    fontSize: 11,
    color: '#aaaaaa',
    marginBottom: 12,
  },
  body: {
    fontFamily: F.regular,
    fontSize: 13,
    lineHeight: 22,
    color: '#555555',
  },
  rule: {
    width: 28,
    height: 2,
    backgroundColor: C.panelLeftBg,
    marginTop: 18,
  },
});
