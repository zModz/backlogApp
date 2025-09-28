import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";

const screenHeight = Dimensions.get("window").height;

export default function FloatingPanel({
  collapsedY,
  expandedY,
  onCollapse,
  onExpand,
  children,
  onTranslateYChange,
  dragEnabled = true,
}: {
  collapsedY: number;
  expandedY: number;
  onCollapse: () => void;
  onExpand: () => void;
  children: (
    isExpanded: boolean,
    controls: { reset: () => void; expand: () => void }
  ) => React.ReactNode;
  onTranslateYChange?: (value: Animated.Value) => void;
  dragEnabled?: boolean;
}) {
  const translateY = useRef(new Animated.Value(collapsedY)).current;
  const lastOffset = useRef(collapsedY);
  const theme = useTheme();

  React.useEffect(() => {
    if (onTranslateYChange) {
      onTranslateYChange(translateY);
    }
  }, [onTranslateYChange, translateY]);

  const reset = () => {
    Animated.spring(translateY, {
      toValue: collapsedY,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = collapsedY;
      onCollapse?.();
    });
  };

  const expand = () => {
    Animated.spring(translateY, {
      toValue: expandedY,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = expandedY;
      onExpand?.();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        const newY = lastOffset.current + gesture.dy;
        translateY.setValue(Math.min(Math.max(newY, expandedY), collapsedY));
      },
      onPanResponderRelease: (_, gesture) => {
        const shouldOpen = gesture.vy < 0 || gesture.moveY < screenHeight / 2;
        const finalY = shouldOpen ? expandedY : collapsedY;
        Animated.spring(translateY, {
          toValue: finalY,
          useNativeDriver: true,
        }).start(() => {
          lastOffset.current = finalY;
          if (!shouldOpen) {
            onCollapse?.();
          } else {
            onExpand?.();
          }
        });
      },
    })
  ).current;

  const isExpanded = translateY.__getValue() <= expandedY + 10;

  // Overlay opacity based on panel position
  const overlayOpacity = translateY.interpolate({
    inputRange: [expandedY, collapsedY],
    outputRange: [0.3, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: overlayOpacity,
        }}
      />

      <Animated.View
        {...(dragEnabled ? panResponder.panHandlers : {})}
        style={[
          styles.panel,
          {
            transform: [{ translateY }],
            backgroundColor: theme.colors.elevation.level2,
          },
        ]}
      >
        {expandedY !== 0 ? (
          <View
            style={[
              styles.handle,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        ) : (
          <View style={styles.header}>
            <View style={{ flex: 1 }} />
            <IconButton
              icon={"close"}
              onPress={reset}
              style={{ position: "absolute", right: 16, top: 12, elevation: 8 }}
              containerColor={theme.colors.primary}
              iconColor={theme.colors.onPrimary}
              accessibilityLabel="Close"
            />
          </View>
        )}
        {children(isExpanded, { reset, expand })}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    height: screenHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    overflow: "hidden",
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    marginVertical: 8,
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 48,
    marginTop: StatusBar.currentHeight,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
