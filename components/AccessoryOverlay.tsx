import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

import type { AccessoryId } from '@/lib/types';

interface AccessoryOverlayProps {
  id: AccessoryId;
}

/** SVG accessory shapes anchored to the shared dog silhouette (viewBox 0 0 100 120). */
export function AccessoryOverlay({ id }: AccessoryOverlayProps) {
  switch (id) {
    case 'backpack':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Rect x="58" y="52" width="22" height="28" rx="4" fill="#5B8DEF" stroke="#3A6CD4" strokeWidth="1.5" />
          <Rect x="62" y="48" width="14" height="8" rx="2" fill="#4A7AD9" />
          <Path d="M58 58 L48 50 L48 62 Z" fill="#6B9AF0" />
        </Svg>
      );
    case 'bandana':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path d="M28 58 Q50 72 72 58 L68 64 Q50 76 32 64 Z" fill="#E63946" stroke="#C1121F" strokeWidth="1.2" />
          <Circle cx="50" cy="66" r="3" fill="#C1121F" />
        </Svg>
      );
    case 'bowtie':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path d="M50 62 L38 56 L38 68 Z" fill="#9B5DE5" />
          <Path d="M50 62 L62 56 L62 68 Z" fill="#9B5DE5" />
          <Circle cx="50" cy="62" r="4" fill="#7B2CBF" />
        </Svg>
      );
    case 'sunglasses':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Rect x="30" y="34" width="18" height="10" rx="3" fill="#222" opacity="0.85" />
          <Rect x="52" y="34" width="18" height="10" rx="3" fill="#222" opacity="0.85" />
          <Rect x="47" y="37" width="6" height="3" rx="1" fill="#444" />
          <Path d="M30 39 L22 36" stroke="#222" strokeWidth="2" />
          <Path d="M70 39 L78 36" stroke="#222" strokeWidth="2" />
        </Svg>
      );
    case 'crown':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path
            d="M30 24 L38 10 L50 20 L62 10 L70 24 L68 30 L32 30 Z"
            fill="#FFD60A"
            stroke="#E09F00"
            strokeWidth="1.2"
          />
          <Circle cx="38" cy="14" r="2.5" fill="#FF6B6B" />
          <Circle cx="50" cy="18" r="2.5" fill="#4ECDC4" />
          <Circle cx="62" cy="14" r="2.5" fill="#FF6B6B" />
        </Svg>
      );
    default:
      return null;
  }
}

/** Layered dog body drawn in SVG so accessories align consistently. */
export function DogBodySvg({
  furColor,
  style,
  mood,
}: {
  furColor: string;
  style: string;
  mood: 'idle' | 'happy' | 'tired';
}) {
  const earFloppy = style === 'fluffy';
  const earPointy = style === 'sporty';
  const eyeY = mood === 'tired' ? 36 : 34;
  const mouthPath =
    mood === 'happy'
      ? 'M42 46 Q50 52 58 46'
      : mood === 'tired'
        ? 'M44 48 Q50 44 56 48'
        : 'M44 47 Q50 50 56 47';

  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 120">
      {/* Body */}
      <Ellipse cx="50" cy="82" rx="30" ry="26" fill={furColor} stroke="#fff" strokeWidth="2" />
      {/* Legs */}
      <Ellipse cx="36" cy="104" rx="7" ry="5" fill={furColor} />
      <Ellipse cx="64" cy="104" rx="7" ry="5" fill={furColor} />
      {/* Head */}
      <Circle cx="50" cy="40" r="24" fill={furColor} stroke="#fff" strokeWidth="2" />
      {/* Ears */}
      {earFloppy && (
        <>
          <Ellipse cx="28" cy="32" rx="10" ry="14" fill={furColor} transform="rotate(-20 28 32)" />
          <Ellipse cx="72" cy="32" rx="10" ry="14" fill={furColor} transform="rotate(20 72 32)" />
        </>
      )}
      {earPointy && (
        <>
          <Path d="M30 28 L24 12 L38 24 Z" fill={furColor} />
          <Path d="M70 28 L76 12 L62 24 Z" fill={furColor} />
        </>
      )}
      {style === 'adventurer' && (
        <>
          <Path d="M32 30 L28 18 L40 26 Z" fill={furColor} />
          <Path d="M68 30 L72 18 L60 26 Z" fill={furColor} />
        </>
      )}
      {/* Face */}
      <Circle cx="40" cy={eyeY} r="3" fill="#222" />
      <Circle cx="60" cy={eyeY} r="3" fill="#222" />
      {mood === 'happy' && (
        <>
          <Circle cx="38" cy={eyeY - 2} r="1" fill="#fff" />
          <Circle cx="58" cy={eyeY - 2} r="1" fill="#fff" />
        </>
      )}
      <Ellipse cx="50" cy="42" rx="5" ry="4" fill="#3A2A1A" />
      <Path d={mouthPath} stroke="#3A2A1A" strokeWidth="1.5" fill="none" />
      {/* Tail */}
      <Path d="M76 78 Q92 68 88 52" stroke={furColor} strokeWidth="8" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
