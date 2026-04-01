export type FloatingPanelProps = {
  collapsedY: number;
  expandedY: number;
  onCollapse: () => void;
  onExpand: () => void;
  children: (
    isExpanded: boolean,
    controls: { reset: () => void; expand: () => void },
    scrollRef: React.RefObject<FlatList<any> | ScrollView>,
    onScroll: number,
  ) => React.ReactNode;
  //   translateY: SharedValue<number>;
  // onTranslateYChange?: SharedValue<number>;
  height?: number;
  dragEnabled?: boolean;
};

export type PanelPreset = "default" | "tall" | "fullscreen" | "custom";

export type PanelRequest = {
  preset?: PanelPreset;
  customPositions?: {
    collapsedRatio?: number;
    expandedOffset?: number;
    expandedAbsolute?: number;
  };
  dragEnabled?: boolean;
  autoExpand?: boolean;
  height?: number;
  render: FloatingPanelProps["children"];
};
