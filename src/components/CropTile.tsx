import type { CSSProperties } from 'react';

/**
 * The source screenshot lives in /public and is used as a single sprite-sheet.
 * Each "element" is a rectangle inside that sheet that we crop with CSS
 * background-position so the browser only loads the image once.
 */
const SRC = '/yum-jump-screenshot.png';
const SRC_W = 1923;
const SRC_H = 1083;

export type CropElement = {
  /** Display name. */
  name: string;
  /** Top-left X in source-image pixels. */
  x: number;
  /** Top-left Y in source-image pixels. */
  y: number;
  /** Crop width in source-image pixels. */
  w: number;
  /** Crop height in source-image pixels. */
  h: number;
};

/**
 * Hand-tuned crop rectangles inside /public/yum-jump-screenshot.png.
 * Eyeballed from the source — tweak if the art shifts.
 */
export const ELEMENTS = {
  player: { name: 'Player', x: 460, y: 615, w: 130, h: 165 },
  pig: { name: 'Pig', x: 1335, y: 430, w: 165, h: 145 },
  cherries: { name: 'Cherries', x: 5, y: 240, w: 110, h: 110 },
  apple: { name: 'Apple', x: 5, y: 10, w: 90, h: 90 },
  banana: { name: 'Banana', x: 850, y: 870, w: 100, h: 110 },
  bananaHud: { name: 'Banana HUD', x: 35, y: 130, w: 80, h: 65 },
  spikes: { name: 'Spikes', x: 260, y: 380, w: 165, h: 65 },
  saw: { name: 'Saw', x: 1815, y: 370, w: 110, h: 100 },
  score: { name: 'Score', x: 1480, y: 5, w: 440, h: 95 },
} as const satisfies Record<string, CropElement>;

type Props = {
  element: CropElement;
  /** Longest side of the rendered tile, in CSS pixels. */
  displaySize?: number;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
};

export function CropTile({
  element,
  displaySize = 160,
  className = '',
  style,
  ariaLabel,
}: Props) {
  const { x, y, w, h } = element;
  // Scale so the longer edge of the crop equals displaySize.
  const scale = displaySize / Math.max(w, h);
  const renderW = w * scale;
  const renderH = h * scale;
  const bgW = SRC_W * scale;
  const bgH = SRC_H * scale;
  const bgX = -x * scale;
  const bgY = -y * scale;

  return (
    <div
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel ?? element.name}
      className={`pixel-art ${className}`}
      style={{
        width: `${renderW}px`,
        height: `${renderH}px`,
        backgroundImage: `url(${SRC})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        ...style,
      }}
    />
  );
}
