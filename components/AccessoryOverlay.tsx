import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient as SvgLinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

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
  mood: 'idle' | 'happy' | 'tired' | 'curious';
}) {
  const earFloppy = style === 'fluffy';
  const earPointy = style === 'sporty';
  const eyeY = mood === 'tired' ? 36 : 34;
  const mouthPath =
    mood === 'happy'
      ? 'M42 46 Q50 52 58 46'
      : mood === 'tired'
        ? 'M44 48 Q50 44 56 48'
        : mood === 'curious'
          ? 'M45 48 Q50 51 55 48'
        : 'M44 47 Q50 50 56 47';

  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 120">
      <Defs>
        <SvgLinearGradient id="furShade" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
          <Stop offset="0.55" stopColor={furColor} stopOpacity="1" />
          <Stop offset="1" stopColor="#2A1B12" stopOpacity="0.18" />
        </SvgLinearGradient>
        <SvgLinearGradient id="bellyShade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF4DF" stopOpacity="0.95" />
          <Stop offset="1" stopColor="#F4D4A4" stopOpacity="0.78" />
        </SvgLinearGradient>
      </Defs>
      <Path d="M22 78 Q25 59 42 57 L59 57 Q78 61 82 80 Q84 100 66 106 L35 106 Q17 99 22 78 Z" fill="url(#furShade)" stroke="#fff" strokeWidth="2" />
      <Ellipse cx="50" cy="84" rx="16" ry="18" fill="url(#bellyShade)" opacity="0.88" />
      <Ellipse cx="34" cy="103" rx="8" ry="6" fill={furColor} stroke="#fff" strokeWidth="1" />
      <Ellipse cx="66" cy="103" rx="8" ry="6" fill={furColor} stroke="#fff" strokeWidth="1" />
      <Circle cx="50" cy="40" r="25" fill="url(#furShade)" stroke="#fff" strokeWidth="2" />
      {earFloppy && (
        <>
          <Ellipse cx="27" cy="34" rx="11" ry="17" fill={furColor} transform="rotate(-24 27 34)" stroke="#fff" strokeWidth="1" />
          <Ellipse cx="73" cy="34" rx="11" ry="17" fill={furColor} transform="rotate(24 73 34)" stroke="#fff" strokeWidth="1" />
        </>
      )}
      {earPointy && (
        <>
          <Path d="M30 28 L24 11 L39 24 Z" fill={furColor} stroke="#fff" strokeWidth="1" />
          <Path d="M70 28 L76 11 L61 24 Z" fill={furColor} stroke="#fff" strokeWidth="1" />
        </>
      )}
      {style === 'adventurer' && (
        <>
          <Path d="M32 30 L28 17 L41 26 Z" fill={furColor} stroke="#fff" strokeWidth="1" />
          <Path d="M68 30 L72 17 L59 26 Z" fill={furColor} stroke="#fff" strokeWidth="1" />
        </>
      )}
      <Ellipse cx="50" cy="44" rx="12" ry="9" fill="#FFF2DC" opacity="0.86" />
      <Circle cx="40" cy={eyeY} r={mood === 'curious' ? 3.6 : 3} fill="#222" />
      <Circle cx="60" cy={eyeY + (mood === 'curious' ? -1 : 0)} r={mood === 'curious' ? 3.6 : 3} fill="#222" />
      {mood === 'happy' && (
        <>
          <Circle cx="38" cy={eyeY - 2} r="1" fill="#fff" />
          <Circle cx="58" cy={eyeY - 2} r="1" fill="#fff" />
        </>
      )}
      {mood === 'tired' && (
        <>
          <Path d="M35 32 L44 34" stroke="#3A2A1A" strokeWidth="1.4" strokeLinecap="round" />
          <Path d="M56 34 L65 32" stroke="#3A2A1A" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}
      <Ellipse cx="50" cy="42" rx="5" ry="4" fill="#3A2A1A" />
      <Path d={mouthPath} stroke="#3A2A1A" strokeWidth="1.5" fill="none" />
      <Circle cx="34" cy="47" r="2.5" fill="#FF8A9A" opacity="0.5" />
      <Circle cx="66" cy="47" r="2.5" fill="#FF8A9A" opacity="0.5" />
      <Path d="M75 78 Q94 67 88 51" stroke={furColor} strokeWidth="8" fill="none" strokeLinecap="round" />
      <Path d="M34 103 Q36 100 39 103" stroke="#3A2A1A" strokeWidth="1" fill="none" opacity="0.45" />
      <Path d="M61 103 Q64 100 67 103" stroke="#3A2A1A" strokeWidth="1" fill="none" opacity="0.45" />
    </Svg>
  );
}
