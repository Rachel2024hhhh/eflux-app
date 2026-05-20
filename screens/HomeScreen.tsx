import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { C, S } from '../constants/theme';
import TopHeader from '../components/TopHeader';
import ArticleCard from '../components/ArticleCard';
import GlassStrip from '../components/GlassStrip';
import BottomBar from '../components/BottomBar';
import BottomPanel from '../components/BottomPanel';
import GlassPanel from '../components/GlassPanel';
import CircleTextAnimation from '../components/CircleTextAnimation';
import { ARTICLES } from '../constants/data';

const T = S.topHeaderHeight; // top frame height
const B = S.bottomBarHeight; // bottom frame height
const STRIP = S.sideStrip;   // side strip width

export default function HomeScreen() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const [titleDone, setTitleDone] = useState(false);
  const [W, setW] = useState(390);
  const [H, setH] = useState(844);

  return (
    <SafeAreaView
      style={styles.root}
      onLayout={e => {
        setW(e.nativeEvent.layout.width);
        setH(e.nativeEvent.layout.height);
      }}
    >
      <TopHeader isOpen={panelOpen} onToggle={() => setPanelOpen((v) => !v)} />

      <View style={styles.body}>
        <GlassStrip side="left" />
        <ScrollView
          style={styles.feed}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CircleTextAnimation
            text="Spring 2026"
            height={180}
            style={styles.feedTitle}
            onDone={() => setTitleDone(true)}
          />
          {ARTICLES.map((item, index) => (
            <ArticleCard key={`${item.id}-${index}`} item={item} index={index} />
          ))}
        </ScrollView>
        <GlassStrip side="right" />
      </View>

      <BottomBar isOpen={bottomPanelOpen} onToggle={() => setBottomPanelOpen(v => !v)} />

      {/* Mitered corner overlay — 45° diagonal seams matching desktop polygon geometry.
          Top corners: blue triangles cut into the yellow header's lower-left/right corners.
          Bottom corners: blue-on-blue, seamless (no overlay needed). */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Svg width={W} height={H}>
          {/* Top-left: diagonal seam from (0,0) to (STRIP,T) — blue fills below */}
          <Polygon points={`0,0 0,${T} ${STRIP},${T}`} fill={C.panelLeftBg} />
          {/* Top-right: mirror */}
          <Polygon points={`${W},0 ${W},${T} ${W - STRIP},${T}`} fill={C.panelLeftBg} />
          {/* Bottom-left: diagonal seam from (0,H) to (STRIP,H-B) */}
          <Polygon points={`0,${H} 0,${H - B} ${STRIP},${H - B}`} fill={C.panelLeftBg} />
          {/* Bottom-right: mirror */}
          <Polygon points={`${W},${H} ${W},${H - B} ${W - STRIP},${H - B}`} fill={C.panelLeftBg} />
        </Svg>
      </View>

      {panelOpen && (
        <GlassPanel onClose={() => setPanelOpen(false)} />
      )}

      {bottomPanelOpen && (
        <BottomPanel onClose={() => setBottomPanelOpen(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.panelLeftBg,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  feed: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  feedTitle: {},
});
