import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PanResponder,
  TextInput,
  Platform,
  Linking,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { C, F } from '../constants/theme';
import {
  NAV_CONTENT,
  NAV_ITEMS,
  CONTRIBUTORS,
  SOCIAL,
  EVENTS,
  type NavSection,
} from '../constants/data';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = SCREEN_HEIGHT * 0.82;

interface Props {
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Browse (left panel content)
// ─────────────────────────────────────────────────────────────────────────────
function BrowseContent() {
  const [section, setSection] = useState<NavSection>('Index');
  const items = NAV_CONTENT[section].items;

  return (
    <View style={inner.root}>
      {/* Section tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={inner.tabScroll}
        contentContainerStyle={inner.tabRow}
      >
        {NAV_ITEMS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[inner.sectionTab, section === s && inner.sectionTabActive]}
            onPress={() => setSection(s)}
            activeOpacity={0.7}
          >
            <Text style={[inner.sectionLabel, section === s && inner.sectionLabelActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Items list */}
      <ScrollView showsVerticalScrollIndicator={false} style={inner.list}>
        {items.map((item) => (
          <View key={item.id} style={inner.navItem}>
            <View style={[inner.dot, { backgroundColor: item.accent ?? C.efluxBlue }]} />
            <View style={inner.navBody}>
              <Text style={inner.navTitle}>{item.title}</Text>
              <Text style={inner.navMeta}>{item.meta}</Text>
              <Text style={inner.navBodyText}>{item.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About (right panel content)
// ─────────────────────────────────────────────────────────────────────────────
function AboutContent() {
  const [section, setSection] = useState<'about' | 'contributors' | 'credits'>('about');

  return (
    <View style={inner.root}>
      {/* Section tabs */}
      <View style={inner.tabRow}>
        {(['about', 'contributors', 'credits'] as const).map((s) => (
          <TouchableOpacity
            key={s}
            style={[inner.sectionTab, section === s && inner.sectionTabActive]}
            onPress={() => setSection(s)}
            activeOpacity={0.7}
          >
            <Text style={[inner.sectionLabel, section === s && inner.sectionLabelActive]}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={inner.list}>
        {section === 'about' && (
          <View>
            <Text style={inner.aboutTitle}>e&#8209;flux Journal</Text>
            <Text style={inner.aboutBody}>
              e-flux journal is a peer-reviewed publication dedicated to contemporary art,
              architecture, and critical theory. Founded in 1999, it has become one of the
              most widely read publications in the international art world.
            </Text>
            <Text style={inner.aboutBody}>
              Each issue features commissioned essays, artist projects, and interviews that
              address the most pressing questions of our time. The journal is published
              online and distributed freely to over 180,000 readers worldwide.
            </Text>
            <View style={inner.statRow}>
              <View style={inner.stat}>
                <Text style={inner.statNum}>180k+</Text>
                <Text style={inner.statLabel}>Readers worldwide</Text>
              </View>
              <View style={inner.stat}>
                <Text style={inner.statNum}>142</Text>
                <Text style={inner.statLabel}>Issues published</Text>
              </View>
              <View style={inner.stat}>
                <Text style={inner.statNum}>1999</Text>
                <Text style={inner.statLabel}>Founded, New York</Text>
              </View>
            </View>
          </View>
        )}

        {section === 'contributors' && (
          <View>
            {CONTRIBUTORS.map((c) => (
              <View key={c.name} style={inner.contributorRow}>
                <Text style={inner.contributorName}>{c.name}</Text>
                <Text style={inner.contributorRole}>{c.role}</Text>
              </View>
            ))}
          </View>
        )}

        {section === 'credits' && (
          <View>
            <Text style={inner.creditsItem}>
              <Text style={inner.creditsBold}>Publisher: </Text>
              e-flux, New York
            </Text>
            <Text style={inner.creditsItem}>
              <Text style={inner.creditsBold}>Editor in Chief: </Text>
              Julieta Aranda, Brian Kuan Wood, Anton Vidokle
            </Text>
            <Text style={inner.creditsItem}>
              <Text style={inner.creditsBold}>Design: </Text>
              Metahaven
            </Text>
            <Text style={inner.creditsItem}>
              <Text style={inner.creditsBold}>ISSN: </Text>
              2328-2val-0X
            </Text>
            <Text style={inner.creditsItem}>
              <Text style={inner.creditsBold}>License: </Text>
              CC BY-NC-ND 4.0
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Info (bottom panel content)
// ─────────────────────────────────────────────────────────────────────────────
function InfoContent() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={inner.list}>
      {/* Social */}
      <Text style={inner.sectionHead}>Follow</Text>
      {SOCIAL.map((s) => (
        <TouchableOpacity
          key={s.name}
          style={inner.socialRow}
          onPress={() => s.href !== '#' && Linking.openURL(s.href)}
          activeOpacity={0.7}
        >
          <Text style={inner.socialName}>{s.name}</Text>
          <Text style={inner.socialHandle}>{s.handle}</Text>
        </TouchableOpacity>
      ))}

      {/* Newsletter */}
      <Text style={[inner.sectionHead, { marginTop: 24 }]}>Subscribe</Text>
      {subscribed ? (
        <View style={inner.confirmBox}>
          <Text style={inner.confirmText}>You're on the list.</Text>
          <Text style={inner.confirmSub}>Expect dispatches from the edges.</Text>
        </View>
      ) : (
        <View>
          <Text style={inner.newsletterCopy}>
            New issues, events, and critical texts — delivered direct.
          </Text>
          <View style={inner.inputRow}>
            <TextInput
              style={inner.emailInput}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={C.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={inner.subscribeBtn}
              onPress={() => { if (email.trim()) setSubscribed(true); }}
              activeOpacity={0.8}
            >
              <Text style={inner.subscribeBtnText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Upcoming events */}
      <Text style={[inner.sectionHead, { marginTop: 24 }]}>Upcoming</Text>
      {EVENTS.map((ev) => (
        <View key={ev.title} style={inner.eventRow}>
          <Text style={inner.eventTitle}>{ev.title}</Text>
          <Text style={inner.eventDate}>{ev.date}</Text>
          <Text style={inner.eventDesc}>{ev.desc}</Text>
        </View>
      ))}

      {/* Footer */}
      <View style={inner.footer}>
        <Text style={inner.footerText}>e‑flux · Founded 1999 · New York</Text>
        <Text style={inner.footerText}>Issue 142 · Spring 2026</Text>
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main GlassPanel sheet — slides DOWN from top
// ─────────────────────────────────────────────────────────────────────────────
export default function GlassPanel({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'browse' | 'about' | 'info'>('browse');
  const slideAnim = useRef(new Animated.Value(-PANEL_HEIGHT)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 55,
      friction: 11,
    }).start();
  }, [slideAnim]);

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: -PANEL_HEIGHT,
      duration: 260,
      useNativeDriver: true,
    }).start(onClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy < -8 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy < 0) slideAnim.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy < -80 || g.vy < -0.5) {
          close();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 80,
            friction: 14,
          }).start();
        }
      },
    })
  ).current;

  const panelContent =
    activeTab === 'browse' ? (
      <BrowseContent />
    ) : activeTab === 'about' ? (
      <AboutContent />
    ) : (
      <InfoContent />
    );

  const glassContent = (
    <>
      {/* Glass overlay tint */}
      <View style={[StyleSheet.absoluteFill, styles.glassTint]} pointerEvents="none" />

      {/* Header */}
      <View style={styles.panelHeader}>
        <View style={styles.tabsRow}>
          {(['browse', 'about', 'info'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={close} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentArea}>
        {panelContent}
      </View>

      {/* Drag handle at bottom */}
      <View style={styles.handleArea} {...panResponder.panHandlers}>
        <View style={styles.handle} />
      </View>
    </>
  );

  return (
    <Animated.View
      style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
    >
      {Platform.OS === 'ios' ? (
        <BlurView intensity={85} tint="extraLight" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: C.bgMain + 'f4' }]} />
      )}
      {glassContent}
    </Animated.View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 24,
  },
  glassTint: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: C.border,
    borderRadius: 2,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: C.efluxBlue,
  },
  tabLabel: {
    fontFamily: F.medium,
    fontSize: 13,
    color: C.textMid,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: C.efluxBlue,
    fontFamily: F.bold,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontFamily: F.regular,
    fontSize: 15,
    color: C.textMid,
  },
  contentArea: {
    flex: 1,
  },
});

// Inner styles for sub-components
const inner = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabScroll: {
    flexGrow: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 0,
    gap: 4,
  },
  sectionTab: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  sectionTabActive: {
    borderBottomColor: C.efluxBlue,
  },
  sectionLabel: {
    fontFamily: F.medium,
    fontSize: 13,
    color: C.textMid,
    letterSpacing: 0.2,
  },
  sectionLabelActive: {
    color: C.efluxBlue,
    fontFamily: F.bold,
  },
  list: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  navItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
    gap: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  navBody: {
    flex: 1,
  },
  navTitle: {
    fontFamily: F.bold,
    fontSize: 14,
    color: C.textMain,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  navMeta: {
    fontFamily: F.regular,
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  navBodyText: {
    fontFamily: F.regular,
    fontSize: 13,
    color: C.textLight,
    lineHeight: 18,
  },
  // About
  aboutTitle: {
    fontFamily: F.bold,
    fontSize: 22,
    color: C.efluxBlue,
    letterSpacing: -0.5,
    marginBottom: 12,
    marginTop: 8,
  },
  aboutBody: {
    fontFamily: F.regular,
    fontSize: 14,
    color: C.textMid,
    lineHeight: 21,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    gap: 0,
    marginTop: 16,
    marginBottom: 8,
  },
  stat: {
    flex: 1,
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: C.yellow,
    marginRight: 8,
  },
  statNum: {
    fontFamily: F.bold,
    fontSize: 18,
    color: C.efluxBlue,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: F.regular,
    fontSize: 10,
    color: C.textMuted,
    marginTop: 2,
  },
  contributorRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  contributorName: {
    fontFamily: F.bold,
    fontSize: 14,
    color: C.textMain,
  },
  contributorRole: {
    fontFamily: F.regular,
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  creditsItem: {
    fontFamily: F.regular,
    fontSize: 13,
    color: C.textMid,
    lineHeight: 22,
  },
  creditsBold: {
    fontFamily: F.bold,
    color: C.textMain,
  },
  // Info
  sectionHead: {
    fontFamily: F.bold,
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 4,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  socialName: {
    fontFamily: F.medium,
    fontSize: 14,
    color: C.textMain,
  },
  socialHandle: {
    fontFamily: F.regular,
    fontSize: 13,
    color: C.efluxBlue,
  },
  newsletterCopy: {
    fontFamily: F.regular,
    fontSize: 13,
    color: C.textMid,
    lineHeight: 19,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  emailInput: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 3,
    paddingHorizontal: 12,
    fontFamily: F.regular,
    fontSize: 13,
    color: C.textMain,
    backgroundColor: C.bgMain,
  },
  subscribeBtn: {
    height: 42,
    backgroundColor: C.efluxBlue,
    paddingHorizontal: 16,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeBtnText: {
    fontFamily: F.bold,
    fontSize: 12,
    color: C.white,
    letterSpacing: 0.3,
  },
  confirmBox: {
    paddingVertical: 12,
  },
  confirmText: {
    fontFamily: F.bold,
    fontSize: 14,
    color: C.textMain,
  },
  confirmSub: {
    fontFamily: F.regular,
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  eventRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  eventTitle: {
    fontFamily: F.bold,
    fontSize: 13,
    color: C.textMain,
    marginBottom: 2,
  },
  eventDate: {
    fontFamily: F.medium,
    fontSize: 11,
    color: C.efluxBlue,
    marginBottom: 4,
  },
  eventDesc: {
    fontFamily: F.regular,
    fontSize: 12,
    color: C.textLight,
    lineHeight: 17,
  },
  footer: {
    paddingVertical: 24,
    gap: 3,
  },
  footerText: {
    fontFamily: F.regular,
    fontSize: 11,
    color: C.textMuted,
  },
});
