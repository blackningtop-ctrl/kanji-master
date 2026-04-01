/**
 * 쓰기 점수 계산 엔진
 *
 * 점수 구성:
 * - 획순 정확도: 40%
 * - 형태 정확도: 40%
 * - 균형감: 20%
 *
 * 실제 ML 모델 없이 기본적인 휴리스틱으로 점수를 계산합니다.
 * Phase 2에서 TensorFlow Lite / Core ML 모델로 교체 예정.
 */

export interface WritingScore {
  total: number;         // 0-100
  strokeOrder: number;   // 0-100 (40% weight)
  formAccuracy: number;  // 0-100 (40% weight)
  balance: number;       // 0-100 (20% weight)
  grade: 'excellent' | 'good' | 'fair'; // ◎ ○ △
}

export interface StrokePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface UserStroke {
  points: StrokePoint[];
}

/** Calculate writing score from user strokes vs expected stroke count */
export function calculateWritingScore(
  userStrokes: UserStroke[],
  expectedStrokeCount: number,
  canvasSize: number,
): WritingScore {
  // Stroke order: compare stroke count
  const strokeCountDiff = Math.abs(userStrokes.length - expectedStrokeCount);
  const strokeOrderScore = Math.max(0, 100 - strokeCountDiff * 20);

  // Form accuracy: check stroke coverage and direction
  const formAccuracy = calculateFormAccuracy(userStrokes, canvasSize);

  // Balance: check if strokes are centered and proportional
  const balance = calculateBalance(userStrokes, canvasSize);

  // Weighted total
  const total = Math.round(
    strokeOrderScore * 0.4 +
    formAccuracy * 0.4 +
    balance * 0.2
  );

  let grade: WritingScore['grade'] = 'fair';
  if (total >= 80) grade = 'excellent';
  else if (total >= 60) grade = 'good';

  return { total, strokeOrder: strokeOrderScore, formAccuracy, balance, grade };
}

function calculateFormAccuracy(strokes: UserStroke[], canvasSize: number): number {
  if (strokes.length === 0) return 0;

  let score = 100;
  const margin = canvasSize * 0.1;

  for (const stroke of strokes) {
    if (stroke.points.length < 2) {
      score -= 10; // Too short
      continue;
    }

    // Check if stroke is within bounds
    for (const point of stroke.points) {
      if (point.x < margin || point.x > canvasSize - margin ||
          point.y < margin || point.y > canvasSize - margin) {
        score -= 2;
      }
    }

    // Check stroke length (too short = bad)
    const length = calculateStrokeLength(stroke);
    if (length < canvasSize * 0.05) {
      score -= 15; // Stroke too short
    }
  }

  return Math.max(0, Math.min(100, score));
}

function calculateBalance(strokes: UserStroke[], canvasSize: number): number {
  if (strokes.length === 0) return 0;

  const allPoints = strokes.flatMap((s) => s.points);
  if (allPoints.length === 0) return 0;

  // Calculate center of mass
  const centerX = allPoints.reduce((sum, p) => sum + p.x, 0) / allPoints.length;
  const centerY = allPoints.reduce((sum, p) => sum + p.y, 0) / allPoints.length;

  // Ideal center is canvas center
  const idealCenter = canvasSize / 2;
  const offsetX = Math.abs(centerX - idealCenter) / idealCenter;
  const offsetY = Math.abs(centerY - idealCenter) / idealCenter;

  // Calculate bounding box ratio
  const minX = Math.min(...allPoints.map((p) => p.x));
  const maxX = Math.max(...allPoints.map((p) => p.x));
  const minY = Math.min(...allPoints.map((p) => p.y));
  const maxY = Math.max(...allPoints.map((p) => p.y));

  const width = maxX - minX;
  const height = maxY - minY;
  const sizeRatio = Math.min(width, height) / Math.max(width, height, 1);

  const centerScore = Math.max(0, 100 - (offsetX + offsetY) * 100);
  const ratioScore = sizeRatio * 100;

  return Math.round((centerScore * 0.6 + ratioScore * 0.4));
}

function calculateStrokeLength(stroke: UserStroke): number {
  let length = 0;
  for (let i = 1; i < stroke.points.length; i++) {
    const dx = stroke.points[i].x - stroke.points[i - 1].x;
    const dy = stroke.points[i].y - stroke.points[i - 1].y;
    length += Math.sqrt(dx * dx + dy * dy);
  }
  return length;
}
