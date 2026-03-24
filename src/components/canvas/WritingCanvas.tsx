import { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type WritingMode = 'guide' | 'hint' | 'free';

interface Point {
  x: number;
  y: number;
}

interface WritingCanvasProps {
  targetKanji: string;
  mode: WritingMode;
  size?: number;
  onStrokeComplete?: (paths: string[]) => void;
}

export function WritingCanvas({
  targetKanji,
  mode,
  size: propSize,
  onStrokeComplete,
}: WritingCanvasProps) {
  const screenWidth = Dimensions.get('window').width;
  const size = propSize ?? screenWidth - spacing.lg * 2;

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
          updated[updated.length - 1] = path;
          return updated;
        });
        currentPoints.current = [];
        if (onStrokeComplete) {
          onStrokeComplete([...strokes, path]);
        }
      },
    })
  ).current;

  function clear() {
    setStrokes([]);
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* 원고용지 격자 */}
          <Line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={colors.canvasGridCenter} strokeWidth={1} strokeDasharray="6,4" />
          <Line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke={colors.canvasGridCenter} strokeWidth={1} strokeDasharray="6,4" />

          {/* 가이드 모드: 반투명 한자 */}
          {mode === 'guide' && (
            <Svg>
              {/* 가이드 텍스트는 네이티브 텍스트로 대체 */}
            </Svg>
          )}

          {/* 사용자가 그린 획 */}
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

      {/* 가이드 모드: 배경 한자 */}
      {mode === 'guide' && (
        <View style={[styles.guideOverlay, { width: size, height: size }]} pointerEvents="none">
          <View style={styles.guideTextContainer}>
            <View style={styles.guideKanji}>
              {/* 큰 반투명 한자 표시 */}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

/** 포인트 배열을 SVG path d 속성으로 변환 */
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
  },
  canvas: {
    flex: 1,
  },
  guideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideTextContainer: {
    opacity: 0.15,
  },
  guideKanji: {},
});
