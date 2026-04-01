import FloatingPanel from "@/components/FloatingPanel";
import { PanelRequest } from "@/types/floatingPanel";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PanelContext = createContext<{
  open: (config: PanelRequest) => void;
  close: () => void;
  update: (partial: Partial<PanelRequest>) => void;
  expand: () => void;
  collapse: () => void;
}>({
  open: () => {},
  close: () => {},
  update: () => {},
  expand: () => {},
  collapse: () => {},
});

export const PanelProvider = ({ children }) => {
  const [request, setRequest] = useState<PanelRequest | null>(null);
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const panelControlsRef = useRef<{ reset: () => void; expand: () => void }>();
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (config: PanelRequest) => {
    setRequest(config);

    if (config.autoExpand) {
      expandTimeoutRef.current = setTimeout(() => {
        panelControlsRef.current?.expand();
      }, 0);
    }
  };

  const close = () => {
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }
    setRequest(null);
  };

  const update = (partial: Partial<PanelRequest>) => {
    setRequest((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  const expand = () => panelControlsRef.current?.expand();
  const collapse = () => panelControlsRef.current?.reset();

  useEffect(() => {
    return () => {
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  const positions = useMemo(() => {
    if (!request) return null;

    switch (request.preset) {
      case "fullscreen":
        return {
          collapsedY: screenHeight,
          expandedY: 0,
        };

      case "tall":
        return {
          collapsedY: screenHeight,
          expandedY: screenHeight * 0.25,
        };

      case "custom":
        return {
          collapsedY:
            screenHeight * (request.customPositions?.collapsedRatio ?? 1),
          expandedY:
            request.customPositions?.expandedAbsolute ??
            screenHeight * (request.customPositions?.expandedOffset ?? 0.65),
        };

      default:
        return {
          collapsedY: screenHeight,
          expandedY: screenHeight * 0.65,
        };
    }
  }, [request, screenHeight, insets]);

  return (
    <PanelContext.Provider value={{ open, close, update, expand, collapse }}>
      {children}

      {request && positions && (
        <FloatingPanel
          collapsedY={positions.collapsedY}
          expandedY={positions.expandedY}
          dragEnabled={request.dragEnabled ?? true}
          onCollapse={close}
          onExpand={() => {}}
          height={request.height}
        >
          {(isExpanded, controls, scrollRef, onScroll) => {
            panelControlsRef.current = controls;

            return request.render(isExpanded, controls, scrollRef, onScroll);
          }}
        </FloatingPanel>
      )}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanel must be used within an PanelProvider");
  }
  return context;
};
