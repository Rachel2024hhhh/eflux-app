import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { C, F, S } from '../constants/theme';

const { height: SCREEN_H } = Dimensions.get('window');

export default function GlassStrip({ side }: { side: 'left' | 'right' }) {
  const growScale = useRef(new Animated.Value(0.08)).current;

  useEffect(() => {
    Animated.timing(growScale, {
      toValue: 1,
      duration: 1600,
      easing: Easing.bezier(0.77, 0, 0.175, 1.1),
      useNativeDriver: true,
    }).start();
  }, []);

  const rotate = side === 'left' ? '-90deg' : '90deg';

  return (
    <View style={styles.strip}>
      <Animated.View
        style={[
          styles.textWrap,
          { transform: [{ rotate }, { scaleX: growScale }] },
        ]}
      >
        <Text style={styles.label} numberOfLines={1}>
          E F L U X
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    width: S.sideStrip,
    backgroundColor: C.panelLeftBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    width: SCREEN_H * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: F.display,
    fontSize: 11,
    color: C.yellow,
    letterSpacing: 10,
    textAlign: 'center',
  },
});
