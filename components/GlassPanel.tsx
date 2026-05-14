import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from 'react-native';
import { C, F, S } from '../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = SCREEN_HEIGHT;

const NAV = ['Projects', 'Artists', 'Articles', 'Events', 'Shop'];

interface Props {
  onClose: () => void;
}

export default function GlassPanel({ onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(-PANEL_HEIGHT)).current;

  // IFLUX grow animation — matches desktop panelTextGrow keyframes
  const growScale   = useRef(new Animated.Value(1)).current;
  const growOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 55,
      friction: 11,
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

  return (
    <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
      {/* Blue background */}
      <View style={[StyleSheet.absoluteFill, styles.bg]} pointerEvents="none" />

      {/* IFLUX grow watermark */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.growLayer]}>
        <Animated.Text
          style={[styles.growText, { opacity: growOpacity, transform: [{ scale: growScale }] }]}
        >
          IFLUX
        </Animated.Text>
      </Animated.View>

      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={close} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Nav headings — vertically centred */}
      <View style={styles.navList}>
        {NAV.map((label) => (
          <TouchableOpacity key={label} style={styles.navItem} onPress={close} activeOpacity={0.6}>
            <View style={styles.navRule} />
            <Text style={styles.navLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.navRule} />
      </View>

      {/* Drag handle */}
      <View style={styles.handleArea} {...panResponder.panHandlers}>
        <View style={styles.handle} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    overflow: 'hidden',
    elevation: 24,
    zIndex: 50,
  },
  bg: {
    backgroundColor: C.panelLeftBg,
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
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 10,
    padding: 4,
  },
  closeText: {
    fontFamily: F.regular,
    fontSize: 16,
    color: 'rgba(255,255,255,0.55)',
  },
  navList: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 24,
  },
  navItem: {
    paddingVertical: 0,
  },
  navRule: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  navLabel: {
    fontFamily: F.display,
    fontSize: 52,
    color: C.yellow,
    letterSpacing: -1.5,
    lineHeight: 80,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
});
