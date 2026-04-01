import { FloatingPanelProps } from "@/types/floatingPanel";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function FloatingPanel({
  collapsedY,
  expandedY,
  onCollapse,
  onExpand,
  children,
  height = 600,
  dragEnabled = true,
}: FloatingPanelProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Shared animation state
  const translateY = useSharedValue(collapsedY);
  const contextY = useSharedValue(collapsedY);
  const [isExpanded, setIsExpanded] = useState(false);
  const isAnimating = useSharedValue(false);
  const onScroll = useSharedValue(0);
  const scrollRef = useRef<FlatList | ScrollView>(null);
  const panelHeight = height + insets.bottom; // defined height + bottom inset overlap

  useAnimatedReaction(
    () => translateY.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        const expanded = currentValue <= collapsedY - 5;
        runOnJS(setIsExpanded)(expanded);
      }
    },
    [expandedY],
  );

  const animateTo = (toValue: number, callback?: () => void) => {
    "worklet";

    isAnimating.value = true;

    translateY.value = withSpring(
      toValue,
      {
        damping: 50,
        stiffness: 350,
        overshootClamping: false,
      },
      (finished) => {
        "worklet";

        if (!finished) return;

        isAnimating.value = false;

        // JS state updates
        if (finished && callback) {
          runOnJS(callback)();
        }
      },
    );
  };

  const reset = () => {
    animateTo(collapsedY, onCollapse);
  };

  const expand = () => {
    animateTo(expandedY, onExpand);
  };

  /** --- Gesture setup --- */
  const gesture = Gesture.Pan()
    .enabled(dragEnabled)
    .simultaneousWithExternalGesture(scrollRef)
    .onBegin((event) => {
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      const allowDrag = onScroll.value <= 0 || event.translationY < 0;

      if (!allowDrag) return;

      translateY.value = Math.min(
        Math.max(contextY.value + event.translationY, expandedY),
        collapsedY,
      );
    })
    .onEnd((event) => {
      "worklet";
      const expandThreshold = expandedY + 20; // 20pt above expanded
      const collapseThreshold = collapsedY - 20; // 20pt below collapsed

      let target;

      if (translateY.value < expandThreshold) {
        // Close enough to expanded → expand
        target = expandedY;
        runOnJS(onExpand)();
      } else if (translateY.value > collapseThreshold) {
        // Close enough to collapsed → collapse
        target = collapsedY;
        runOnJS(onCollapse)();
      } else {
        // In the dead zone → decide based on velocity or keep last state
        target =
          translateY.value < (collapsedY + expandedY) / 2
            ? expandedY
            : collapsedY;
      }

      if (target === expandedY) {
        runOnJS(onExpand)();
      } else {
        runOnJS(onCollapse)();
      }

      translateY.value = withSpring(target);
    });

  const composed = Gesture.Simultaneous(gesture);

  /** --- Animated styles --- */
  const animatedPanelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY?.value }],
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY?.value,
      [expandedY, collapsedY],
      [0.3, 0],
      "clamp",
    ),
  }));

  /** --- Handle back button + navigation blur --- */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isExpanded) {
          reset();
          return true;
        }
        return false;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );
      const blurSub = navigation.addListener("blur", reset);

      return () => {
        sub.remove();
        blurSub();
      };
    }, [isExpanded, reset]),
  );

  if (!translateY) {
    console.error(
      "FloatingPanel: translateY is undefined. Make sure you pass a useSharedValue from the parent.",
    );
    return null;
  }

  // const AnimSurface;

  return (
    <>
      {/* Overlay */}
      <Animated.View
        pointerEvents={isExpanded ? "auto" : "none"}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "black" },
          overlayAnimatedStyle,
        ]}
      />

      {/* Panel */}
      <GestureDetector gesture={composed}>
        <Animated.View
          style={[
            styles.panel,
            animatedPanelStyle,
            {
              backgroundColor: theme.colors.elevation.level1,
              height: panelHeight,
              borderTopLeftRadius: theme.roundness * 3.5,
              borderTopRightRadius: theme.roundness * 3.5,
            },
          ]}
        >
          {expandedY !== 0 ? (
            <View
              style={[
                styles.handle,
                { backgroundColor: theme.colors.onSurfaceVariant },
              ]}
            />
          ) : (
            <View style={[styles.header, { marginTop: insets.top }]}>
              <IconButton
                icon="close"
                onPress={() => reset()}
                containerColor={theme.colors.primary}
                iconColor={theme.colors.onPrimary}
              />
            </View>
          )}

          {/* Content */}
          <View style={{ flex: 1, pointerEvents: "box-none" }}>
            {children(isExpanded, { reset, expand }, scrollRef, onScroll)}
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    elevation: 6,
    overflow: "hidden",
    zIndex: 999,
  },
  handle: {
    position: "absolute",
    top: 0,
    zIndex: 999,
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    marginVertical: 8,
  },
  header: {
    position: "absolute",
    top: 0,
    zIndex: 999,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
  },
});
