import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import { C, F, S } from '../constants/theme';
import { SOCIAL, EVENTS } from '../constants/data';
import GhostWordmark, { GHOSTS_BOTTOM } from './GhostWordmark';

const { height: SCREEN_H } = Dimensions.get('window');
const PANEL_H = SCREEN_H;

const ARCHIVE = [
  { issue: '#142', season: 'Spring 2026', theme: 'Infrastructure & Care' },
  { issue: '#141', season: 'Winter 2025', theme: 'Extraction Economies' },
  { issue: '#140', season: 'Autumn 2025', theme: 'After the Archive' },
  { issue: '#139', season: 'Summer 2025', theme: 'Queer Ecologies' },
  { issue: '#138', season: 'Spring 2025', theme: 'Plantation Logics' },
  { issue: '#137', season: 'Winter 2024', theme: 'The Condition of No' },
];

interface Props {
  onClose: () => void;
}

export default function BottomPanel({ onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(PANEL_H)).current;

  // IFLUX grow animation — mirrors GlassPanel
  const growScale   = useRef(new Animated.Value(1)).current;
  const growOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(growScale, {
        toValue: 18,
        duration: 1200,
        easing: Easing.bezier(0.77, 0, 0.175, 1.1),
        useNativeDriver: true,
      }),
      Animated.timing(growOpacity, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.77, 0, 0.175, 1.1),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: PANEL_H,
      duration: 340,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(onClose);
  };

  return (
    <Animated.View
      style={[styles.panel, { transform: [{ translateY: slideAnim }] }]}
    >
      {/* IFLUX grow watermark */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.growLayer]}>
        <Animated.Text
          style={[styles.growText, { opacity: growOpacity, transform: [{ scale: growScale }] }]}
        >
          IFLUX
        </Animated.Text>
      </Animated.View>

      {/* Yellow drag handle bar — tap to close */}
      <Pressable onPress={close} style={styles.handle}>
        <Text style={styles.handleLabel}>Info · Contact · Archive</Text>
        <Text style={styles.handleChevron}>▾</Text>
      </Pressable>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── MASTHEAD ── */}
        <View style={styles.section}>
          <View style={styles.wordmarkWrap}>
            <Text style={styles.wordmark}>e‑flux</Text>
            <GhostWordmark text="e‑flux" textStyle={styles.wordmark} ghosts={GHOSTS_BOTTOM} />
          </View>
          <Text style={styles.strapline}>
            Journal of contemporary art,{'\n'}theory, and critical practice.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.edition}>Founded 1999 · New York</Text>
          <Text style={styles.edition}>Issue 142 · Spring 2026</Text>
        </View>

        {/* ── SOCIAL ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Follow</Text>
          {SOCIAL.map((s) => (
            <Pressable
              key={s.name}
              style={styles.socialRow}
              onPress={() => Linking.openURL(s.href)}
            >
              <Text style={styles.socialName}>{s.name}</Text>
              <Text style={styles.socialHandle}>{s.handle}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── ARCHIVE ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Archive</Text>
          {ARCHIVE.map((entry) => (
            <View key={entry.issue} style={styles.archiveRow}>
              <Text style={styles.archiveIssue}>{entry.issue}</Text>
              <Text style={styles.archiveMeta}>{entry.season} — {entry.theme}</Text>
            </View>
          ))}
        </View>

        {/* ── UPCOMING EVENTS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Upcoming</Text>
          {EVENTS.map((ev) => (
            <View key={ev.title} style={styles.eventItem}>
              <Text style={styles.eventDate}>{ev.date}</Text>
              <Text style={styles.eventTitle}>{ev.title}</Text>
            </View>
          ))}
        </View>

        {/* ── GET THE APP ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Get the App</Text>
          <Text style={styles.appSubtitle}>Read offline. Save issues. Follow exhibitions.</Text>
          <View style={styles.appButtons}>
            <Pressable style={styles.appBtn}>
              <Text style={styles.appBtnIcon}>⬇</Text>
              <View>
                <Text style={styles.appBtnSub}>Download on the</Text>
                <Text style={styles.appBtnTitle}>App Store</Text>
              </View>
            </Pressable>
            <Pressable style={styles.appBtn}>
              <Text style={styles.appBtnIcon}>⬇</Text>
              <View>
                <Text style={styles.appBtnSub}>Get it on</Text>
                <Text style={styles.appBtnTitle}>Google Play</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* ── CONTACT ── */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionLabel}>Contact</Text>
          <Pressable onPress={() => Linking.openURL('mailto:info@e-flux.com')}>
            <Text style={styles.contactEmail}>info@e‑flux.com</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: PANEL_H,
    backgroundColor: C.panelLeftBg,
    zIndex: 100,
  },
  handle: {
    height: S.bottomBarHeight,
    backgroundColor: C.yellow,
    paddingHorizontal: S.sideStrip + 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  handleLabel: {
    fontFamily: F.medium,
    fontSize: 9,
    color: C.panelLeftBg,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  handleChevron: {
    fontSize: 14,
    color: C.panelLeftBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 48,
  },
  section: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  lastSection: {
    borderBottomWidth: 0,
  },

  // Masthead
  wordmark: {
    fontFamily: F.display,
    fontSize: 52,
    color: C.yellow,
    letterSpacing: -2,
    lineHeight: 54,
    marginBottom: 12,
  },
  wordmarkWrap: {
    position: 'relative',
  },
  strapline: {
    fontFamily: F.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 20,
    marginBottom: 20,
  },
  divider: {
    width: 28,
    height: 2,
    backgroundColor: C.yellow,
    marginBottom: 14,
  },
  edition: {
    fontFamily: F.medium,
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  // Section header
  sectionLabel: {
    fontFamily: F.medium,
    fontSize: 9,
    color: C.yellow,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 18,
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  socialName: {
    fontFamily: F.medium,
    fontSize: 13,
    color: '#ffffff',
  },
  socialHandle: {
    fontFamily: F.regular,
    fontSize: 11,
    color: C.yellow,
    letterSpacing: 0.5,
  },

  // Archive
  archiveRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    gap: 14,
  },
  archiveIssue: {
    fontFamily: F.bold,
    fontSize: 11,
    color: C.yellow,
    width: 36,
  },
  archiveMeta: {
    fontFamily: F.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
  },

  // Events
  eventItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  eventDate: {
    fontFamily: F.medium,
    fontSize: 9,
    color: C.yellow,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  eventTitle: {
    fontFamily: F.regular,
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },

  // Get the App
  appSubtitle: {
    fontFamily: F.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 20,
    lineHeight: 18,
  },
  appButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  appBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  appBtnIcon: {
    fontSize: 18,
    color: C.yellow,
  },
  appBtnSub: {
    fontFamily: F.regular,
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  appBtnTitle: {
    fontFamily: F.bold,
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: -0.3,
  },

  // Contact
  contactEmail: {
    fontFamily: F.medium,
    fontSize: 16,
    color: C.yellow,
    letterSpacing: -0.3,
  },
  growLayer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  growText: {
    fontFamily: F.display,
    fontSize: 72,
    color: C.yellow,
    letterSpacing: 2,
  },
});
