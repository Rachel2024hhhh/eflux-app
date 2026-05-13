import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { C, S } from '../constants/theme';
import TopHeader from '../components/TopHeader';
import ArticleCard from '../components/ArticleCard';
import GlassStrip from '../components/GlassStrip';
import BottomBar from '../components/BottomBar';
import GlassPanel from '../components/GlassPanel';
import { ARTICLES } from '../constants/data';

export default function HomeScreen() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [containerW, setContainerW] = useState(390);
  const [headerH, setHeaderH] = useState(S.topHeaderHeight);

  const W = containerW;
  const STRIP = S.sideStrip;

  return (
    <SafeAreaView
      style={styles.root}
      onLayout={e => setContainerW(e.nativeEvent.layout.width)}
    >
      <View onLayout={e => setHeaderH(e.nativeEvent.layout.height)}>
        <TopHeader isOpen={panelOpen} onToggle={() => setPanelOpen((v) => !v)} />
      </View>

      <View style={styles.body}>
        <GlassStrip side="left" />
        <ScrollView
          style={styles.feed}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {ARTICLES.map((item, index) => (
            <ArticleCard key={`${item.id}-${index}`} item={item} />
          ))}
        </ScrollView>
        <GlassStrip side="right" />
      </View>

      <BottomBar />

      {/* Mitered corner overlay — 45° diagonal seams matching desktop polygon geometry */}
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.frameOverlay]}>
        <Svg width={W} height={headerH}>
          {/* Top-left: blue triangle bites into yellow header corner */}
          <Polygon
            points={`0,0 0,${headerH} ${STRIP},${headerH}`}
            fill={C.efluxBlue}
          />
          {/* Top-right: mirror */}
          <Polygon
            points={`${W},0 ${W},${headerH} ${W - STRIP},${headerH}`}
            fill={C.efluxBlue}
          />
        </Svg>
      </View>

      {panelOpen && (
        <GlassPanel onClose={() => setPanelOpen(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  feed: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  frameOverlay: {
    zIndex: 10,
  },
});
