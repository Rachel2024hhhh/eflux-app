import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { C } from '../constants/theme';
import TopHeader from '../components/TopHeader';
import ArticleCard from '../components/ArticleCard';
import GlassStrip from '../components/GlassStrip';
import BottomBar, { PanelContent } from '../components/BottomBar';
import GlassPanel from '../components/GlassPanel';
import { ARTICLES } from '../constants/data';

export default function HomeScreen() {
  const [panel, setPanel] = useState<PanelContent>(null);

  function toggle(id: Exclude<PanelContent, null>) {
    setPanel((prev) => (prev === id ? null : id));
  }

  return (
    <SafeAreaView style={styles.root}>
      <TopHeader />

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

      <BottomBar
        active={panel}
        onFeed={() => setPanel(null)}
        onBrowse={() => toggle('browse')}
        onAbout={() => toggle('about')}
        onInfo={() => toggle('info')}
      />

      {panel !== null && (
        <GlassPanel content={panel} onClose={() => setPanel(null)} />
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
