import { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Rect, Line } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';

interface StrokeOrderViewerProps {
  paths: string[];
  viewBox?: string;
  size?: number;
  showGrid?: boolean;
  autoPlay?: boolean;
  onComplete?: () => void;
}

const STROKE_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
  '#F43F5E', '#6366F1', '#84CC16', '#06B6D4',
];

export function StrokeOrderViewer({
  paths,
  viewBox = '0 0 109 109',
  size = 280,
  showGrid = true,
  autoPlay = false,
  onComplete,
}: StrokeOrderViewerProps) {
  const [visibleStrokes, setVisibleStrokes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeAnims = useRef(paths.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (autoPlay) {
      playAnimation();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoPlay]);

  function playAnimation() {
    setVisibleStrokes(0);
    setIsPlaying(true);
    fadeAnims.forEach((a) => a.setValue(0));
    animateStroke(0);
  }

  function animateStroke(index: number) {
    if (index >= paths.length) {
      setIsPlaying(false);
      onComplete?.();
      return;
    }

    setVisibleStrokes(index + 1);
    Animated.timing(fadeAnims[index], {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    timerRef.current = setTimeout(() => animateStroke(index + 1), 600);
  }

  function showAll() {
    setVisibleStrokes(paths.length);
    fadeAnims.forEach((a) => a.setValue(1));
    setIsPlaying(false);
  }

  function stepForward() {
    if (visibleStrokes < paths.length) {
      const next = visibleStrokes + 1;
      setVisibleStrokes(next);
      Animated.timing(fadeAnims[next - 1], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  function reset() {
    setVisibleStrokes(0);
    fadeAnims.forEach((a) => a.setValue(0));
    setIsPlaying(false);
  }

  const [vbX, vbY, vbW, vbH] = viewBox.split(' ').map(Number);

  return (
    <View style={styles.container}>
      <View style={[styles.svgContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox={viewBox}>
          {/* Grid lines */}
          {showGrid && (
            <>
              <Rect x={vbX} y={vbY} width={vbW} height={vbH} fill={colors.canvasBackground} stroke={colors.canvasGrid} strokeWidth={1} />
              <Line x1={vbW / 2} y1={vbY} x2={vbW / 2} y2={vbH} stroke={colors.canvasGridCenter} strokeWidth={0.5} strokeDasharray="4,4" />
              <Line x1={vbX} y1={vbH / 2} x2={vbW} y2={vbH / 2} stroke={colors.canvasGridCenter} strokeWidth={0.5} strokeDasharray="4,4" />
            </>
          )}

          {/* Ghost strokes (light gray for undrawn) */}
          {paths.map((d, i) => (
            i >= visibleStrokes && (
              <Path
                key={`ghost_${i}`}
                d={d}
                fill="none"
                stroke={colors.strokeGuide}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )
          ))}

          {/* Visible strokes with color coding */}
          {paths.slice(0, visibleStrokes).map((d, i) => (
            <Path
              key={`stroke_${i}`}
              d={d}
              fill="none"
              stroke={STROKE_COLORS[i % STROKE_COLORS.length]}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>

        {/* Stroke number overlay */}
        {visibleStrokes > 0 && visibleStrokes <= paths.length && (
          <View style={styles.strokeNumber}>
            <Text style={styles.strokeNumberText}>
              {visibleStrokes}/{paths.length}
            </Text>
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={reset}>
          <Text style={styles.controlText}>⟲</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={isPlaying ? showAll : playAnimation}
        >
          <Text style={styles.playText}>{isPlaying ? '⏩' : '▶️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={stepForward}>
          <Text style={styles.controlText}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={showAll}>
          <Text style={styles.controlText}>全</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.md },
  svgContainer: {
    backgroundColor: colors.canvasBackground,
    borderRadius: radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  strokeNumber: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  strokeNumberText: { ...typography.caption, color: '#fff' },
  controls: { flexDirection: 'row', gap: spacing.sm },
  controlButton: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  playButton: { backgroundColor: colors.primary, borderColor: colors.primary },
  controlText: { fontSize: 18, color: colors.text },
  playText: { fontSize: 18 },
});
