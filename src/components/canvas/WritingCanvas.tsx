import { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path, Line, Rect } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type WritingMode = 'guide' | 'hint' | 'free';

interface Point {
  x: number;
  y: number;
}

export interface WritingCanvasProps {
  targetKanji?: string;
  targetCharacter?: string;
  mode: WritingMode;
  size?: number;
  onStrokeComplete?: (paths: string[]) => void;
  onClear?: () => void;
}

export function WritingCanvas({
  targetKanji,
  targetCharacter,
  mode,
  size: propSize,
  onStrokeComplete,
}: WritingCanvasProps) {
  const screenWidth = Dimensions.get('window').width;
  const size = propSize ?? screenWidth - spacing.lg * 2;
  const displayChar = targetCharacter ?? targetKanji;

  const [strokes, setStrokes] = useState<string[]>([]);
  const currentPoints = useRef<Point[]>([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current = [{ x: locationX, y: locationY }];
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current.push({ x: locationX, y: locationY });
        const path = pointsToSvgPath(currentPoints.current);
        setStrokes((prev) => {
          const updated = [...prev];
          if (updated.length > 0 && currentPoints.current.length > 1) {
            updated[updated.length - 1] = path;
          } else {
            updated.push(path);
          }
          return updated;
        });
      },
      onPanResponderRelease: () => {
        const path = pointsToSvgPath(currentPoints.current);
        setStrokes((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = path;
          }
          return updated;
        });
        currentPoints.current = [];
        onStrokeComplete?.([...strokes, path]);
      },
    })
  ).current;

  const clear = useCallback(() => {
    setStrokes([]);
  }, []);

  // Expose clear via ref-like pattern
  (WritingCanvas as any)._lastClear = clear;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Guide mode: translucent kanji background */}
      {(mode === 'guide' || mode === 'hint') && displayChar && (
        <View style={[styles.guideOverlay, { width: size, height: size }]} pointerEvents="none">
          <Text
            style={[
              styles.guideText,
              {
                fontSize: size * 0.75,
                lineHeight: size,
                opacity: mode === 'guide' ? 0.12 : 0.06,
              },
            ]}
          >
            {displayChar}
          </Text>
        </View>
      )}

      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Manuscript paper grid */}
          <Rect x={0} y={0} width={size} height={size} fill="none" stroke={colors.canvasGrid} strokeWidth={1} />
          <Line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={colors.canvasGridCenter} strokeWidth={1} strokeDasharray="6,4" />
          <Line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke={colors.canvasGridCenter} strokeWidth={1} strokeDasharray="6,4" />

          {/* User strokes */}
          {strokes.map((d, i) => (
            <Path
              key={i}
              d={d}
              stroke={colors.inkColor}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </Svg>
      </View>

      {/* Stroke count indicator */}
      {strokes.length > 0 && (
        <View style={styles.strokeCount}>
          <Text style={styles.strokeCountText}>{strokes.length}画</Text>
        </View>
      )}
    </View>
  );
}

/** Expose a way to get the clear function */
WritingCanvas.getClear = () => (WritingCanvas as any)._lastClear;

function pointsToSvgPath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y} L ${points[0].x} ${points[0].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colors.canvasBackground,
    borderWidth: 2,
    borderColor: colors.canvasGrid,
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    zIndex: 2,
  },
  guideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  guideText: {
    fontFamily: 'NotoSerifJP',
    color: colors.inkColor,
    textAlign: 'center',
  },
  strokeCount: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 3,
  },
  strokeCountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
