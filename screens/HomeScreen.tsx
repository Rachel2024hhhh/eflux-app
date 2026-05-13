import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import TopHeader from '../components/TopHeader';
import ArticleCard from '../components/ArticleCard';
import GlassStrip from '../components/GlassStrip';
import BottomBar from '../components/BottomBar';
import GlassPanel from '../components/GlassPanel';
import { ARTICLES } from '../constants/data';

export default function HomeScreen() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <TopHeader isOpen={panelOpen} onToggle={() => setPanelOpen((v) => !v)} />

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

      {panelOpen && (
        <GlassPanel onClose={() => setPanelOpen(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bgMain,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  feed: {
    flex: 1,
    backgroundColor: C.bgMain,
  },
});
