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
  /** Crop width in source-image pixels (or natural width when `src` is set). */
  w: number;
  /** Crop height in source-image pixels (or natural height when `src` is set). */
  h: number;
  /** If set, render this standalone image instead of cropping the sheet. */
  src?: string;
};

/**
 * Hand-tuned crop rectangles inside /public/yum-jump-screenshot.png.
 * Eyeballed from the source — tweak if the art shifts.
 */
export const ELEMENTS = {
  player: { name: 'Player', x: 0, y: 0, w: 23, h: 28, src: '/Pink%20Man.png' },
  pig: { name: 'Pig', x: 0, y: 0, w: 33, h: 29, src: '/Angry%20Pig.png' },
  cherries: { name: 'Cherries', x: 0, y: 0, w: 16, h: 16, src: '/Cherry%20cropped.png' },
  apple: { name: 'Apple', x: 0, y: 0, w: 14, h: 16, src: '/Apple%20cropped.png' },
  banana: { name: 'Banana', x: 0, y: 0, w: 16, h: 16, src: '/Banana%20cropped.png' },
  bananaHud: { name: 'Banana HUD', x: 0, y: 0, w: 16, h: 16, src: '/Banana%20cropped.png' },
  kiwi: { name: 'Kiwi', x: 0, y: 0, w: 16, h: 16, src: '/Kiwi%20cropped.png' },
  melon: { name: 'Melon', x: 0, y: 0, w: 20, h: 14, src: '/Melon%20cropped.png' },
  orange: { name: 'Orange', x: 0, y: 0, w: 19, h: 16, src: '/Orange%20cropped.png' },
  pineapple: { name: 'Pineapple', x: 0, y: 0, w: 14, h: 20, src: '/Pineapple%20cropped.png' },
  strawberry: { name: 'Strawberry', x: 0, y: 0, w: 13, h: 16, src: '/Strawberry%20cropped.png' },
  spikes: { name: 'Spikes', x: 260, y: 380, w: 165, h: 65 },
  saw: { name: 'Saw', x: 0, y: 0, w: 38, h: 38, src: '/Saw%20cropped.png' },
  score: { name: 'Score', x: 0, y: 0, w: 338, h: 49, src: '/Score%20cropped.png' },
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

  if (element.src) {
    return (
      <img
        src={element.src}
        alt={ariaLabel ?? element.name}
        className={`pixel-art ${className}`}
        style={{
          width: `${renderW}px`,
          height: `${renderH}px`,
          ...style,
        }}
      />
    );
  }

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
