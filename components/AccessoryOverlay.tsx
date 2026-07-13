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
  pose?: DogPose;
}

export type DogPose = 'front' | 'side';

/** SVG accessory shapes anchored to the shared dog artwork (viewBox 0 0 100 120). */
export function AccessoryOverlay({ id, pose = 'front' }: AccessoryOverlayProps) {
  if (pose === 'side') {
    return <SideAccessoryOverlay id={id} />;
  }

  switch (id) {
    case 'backpack':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Rect x="60" y="58" width="22" height="28" rx="5" fill="#5B8DEF" stroke="#3A6CD4" strokeWidth="1.5" />
          <Rect x="64" y="53" width="14" height="9" rx="3" fill="#4A7AD9" />
          <Path d="M60 64 L48 55 L48 68 Z" fill="#6B9AF0" />
          <Circle cx="71" cy="72" r="3" fill="#BCE7FF" opacity="0.8" />
        </Svg>
      );
    case 'bandana':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path d="M24 60 Q50 76 76 60 L66 86 Q50 98 34 86 Z" fill="#1689D8" stroke="#0F69AA" strokeWidth="1.4" />
          <Path d="M28 61 Q50 72 72 61" stroke="#67C5FF" strokeWidth="2" fill="none" opacity="0.7" />
          <Circle cx="50" cy="77" r="3.2" fill="#fff" />
          <Circle cx="43" cy="72" r="2.2" fill="#fff" />
          <Circle cx="50" cy="70" r="2.4" fill="#fff" />
          <Circle cx="57" cy="72" r="2.2" fill="#fff" />
          <Path d="M43 80 Q50 72 57 80 Q53 84 50 84 Q47 84 43 80 Z" fill="#fff" />
        </Svg>
      );
    case 'bowtie':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path d="M50 64 L36 56 L36 72 Z" fill="#9B5DE5" stroke="#7B2CBF" strokeWidth="1" />
          <Path d="M50 64 L64 56 L64 72 Z" fill="#9B5DE5" stroke="#7B2CBF" strokeWidth="1" />
          <Circle cx="50" cy="64" r="4.5" fill="#7B2CBF" />
        </Svg>
      );
    case 'sunglasses':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Rect x="27" y="36" width="20" height="12" rx="4" fill="#202020" opacity="0.9" />
          <Rect x="53" y="36" width="20" height="12" rx="4" fill="#202020" opacity="0.9" />
          <Rect x="46" y="40" width="8" height="3" rx="1" fill="#333" />
          <Path d="M27 41 L20 38" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <Path d="M73 41 L80 38" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <Circle cx="34" cy="39" r="2" fill="#fff" opacity="0.35" />
          <Circle cx="60" cy="39" r="2" fill="#fff" opacity="0.35" />
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

function SideAccessoryOverlay({ id }: { id: AccessoryId }) {
  switch (id) {
    case 'backpack':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Rect x="30" y="48" width="26" height="28" rx="5" fill="#5B8DEF" stroke="#3A6CD4" strokeWidth="1.5" />
          <Path d="M54 55 Q62 58 66 70" stroke="#3A6CD4" strokeWidth="3" fill="none" strokeLinecap="round" />
          <Circle cx="42" cy="62" r="3" fill="#BCE7FF" opacity="0.8" />
        </Svg>
      );
    case 'bandana':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path d="M52 46 Q67 52 76 66 L65 82 Q55 67 43 57 Z" fill="#1689D8" stroke="#0F69AA" strokeWidth="1.4" />
          <Path d="M51 47 Q66 53 74 65" stroke="#67C5FF" strokeWidth="2" fill="none" opacity="0.7" />
          <Circle cx="64" cy="66" r="2.4" fill="#fff" />
          <Circle cx="59" cy="62" r="1.7" fill="#fff" />
          <Circle cx="64" cy="61" r="1.8" fill="#fff" />
          <Circle cx="69" cy="63" r="1.7" fill="#fff" />
        </Svg>
      );
    case 'bowtie':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path d="M62 57 L51 51 L52 63 Z" fill="#9B5DE5" stroke="#7B2CBF" strokeWidth="1" />
          <Path d="M62 57 L73 51 L72 63 Z" fill="#9B5DE5" stroke="#7B2CBF" strokeWidth="1" />
          <Circle cx="62" cy="57" r="4" fill="#7B2CBF" />
        </Svg>
      );
    case 'sunglasses':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Rect x="69" y="29" width="18" height="11" rx="4" fill="#202020" opacity="0.9" />
          <Path d="M68 35 L59 33" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <Circle cx="75" cy="32" r="2" fill="#fff" opacity="0.35" />
        </Svg>
      );
    case 'crown':
      return (
        <Svg width="100%" height="100%" viewBox="0 0 100 120">
          <Path
            d="M43 20 L50 7 L58 18 L66 8 L73 23 L70 28 L45 27 Z"
            fill="#FFD60A"
            stroke="#E09F00"
            strokeWidth="1.2"
          />
          <Circle cx="50" cy="11" r="2.3" fill="#FF6B6B" />
          <Circle cx="58" cy="18" r="2.2" fill="#4ECDC4" />
          <Circle cx="66" cy="13" r="2.3" fill="#FF6B6B" />
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
  pose = 'front',
}: {
  furColor: string;
  style: string;
  mood: 'idle' | 'happy' | 'tired' | 'curious';
  pose?: DogPose;
}) {
  if (pose === 'side') {
    return <SideDogBodySvg furColor={furColor} style={style} mood={mood} />;
  }

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
      <Path d="M20 80 Q24 57 42 56 L59 56 Q79 60 83 82 Q84 101 67 108 L34 108 Q17 101 20 80 Z" fill="url(#furShade)" stroke="#fff" strokeWidth="2" />
      <Ellipse cx="50" cy="84" rx="17" ry="19" fill="url(#bellyShade)" opacity="0.9" />
      <Ellipse cx="33" cy="105" rx="8" ry="6" fill="#FFF1D7" stroke="#fff" strokeWidth="1" />
      <Ellipse cx="67" cy="105" rx="8" ry="6" fill="#FFF1D7" stroke="#fff" strokeWidth="1" />
      <Path d="M21 76 Q7 70 8 56 Q12 44 22 54 Q25 65 21 76 Z" fill="url(#furShade)" stroke="#fff" strokeWidth="1" />
      <Path d="M79 76 Q93 70 92 56 Q88 44 78 54 Q75 65 79 76 Z" fill="url(#furShade)" stroke="#fff" strokeWidth="1" />
      <Circle cx="50" cy="40" r="27" fill="url(#furShade)" stroke="#fff" strokeWidth="2" />
      {earFloppy && (
        <>
          <Ellipse cx="25" cy="31" rx="12" ry="20" fill="url(#furShade)" transform="rotate(-22 25 31)" stroke="#fff" strokeWidth="1" />
          <Ellipse cx="75" cy="31" rx="12" ry="20" fill="url(#furShade)" transform="rotate(22 75 31)" stroke="#fff" strokeWidth="1" />
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
      <Path d="M27 43 Q39 35 50 43 Q61 35 73 43 Q65 61 50 60 Q35 61 27 43 Z" fill="#FFF2DC" opacity="0.92" />
      <Path d="M37 20 Q42 15 47 20" stroke="#FFF2DC" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <Path d="M53 20 Q58 15 63 20" stroke="#FFF2DC" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <Circle cx="39" cy={eyeY} r={mood === 'curious' ? 6.2 : 5.6} fill="#fff" />
      <Circle cx="61" cy={eyeY + (mood === 'curious' ? -1 : 0)} r={mood === 'curious' ? 6.2 : 5.6} fill="#fff" />
      <Circle cx="39" cy={eyeY} r={mood === 'curious' ? 4.6 : 4.1} fill="#7A3D15" />
      <Circle cx="61" cy={eyeY + (mood === 'curious' ? -1 : 0)} r={mood === 'curious' ? 4.6 : 4.1} fill="#7A3D15" />
      <Circle cx="39" cy={eyeY} r="2.8" fill="#1F120A" />
      <Circle cx="61" cy={eyeY + (mood === 'curious' ? -1 : 0)} r="2.8" fill="#1F120A" />
      <Circle cx="37" cy={eyeY - 2} r="1.5" fill="#fff" />
      <Circle cx="59" cy={eyeY - 3} r="1.5" fill="#fff" />
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
      <Ellipse cx="50" cy="45" rx="5.8" ry="4.6" fill="#2A160E" />
      <Circle cx="47.8" cy="43" r="1" fill="#fff" opacity="0.55" />
      <Path d={mouthPath} stroke="#3A2A1A" strokeWidth="1.5" fill="none" />
      {mood !== 'tired' && <Path d="M45 51 Q50 61 55 51 Q51 55 50 55 Q49 55 45 51 Z" fill="#FF5D72" opacity="0.92" />}
      <Circle cx="34" cy="47" r="2.5" fill="#FF8A9A" opacity="0.5" />
      <Circle cx="66" cy="47" r="2.5" fill="#FF8A9A" opacity="0.5" />
      <Path d="M75 78 Q94 67 88 51" stroke="url(#furShade)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <Path d="M34 103 Q36 100 39 103" stroke="#3A2A1A" strokeWidth="1" fill="none" opacity="0.45" />
      <Path d="M61 103 Q64 100 67 103" stroke="#3A2A1A" strokeWidth="1" fill="none" opacity="0.45" />
    </Svg>
  );
}

function SideDogBodySvg({
  furColor,
  style,
  mood,
}: {
  furColor: string;
  style: string;
  mood: 'idle' | 'happy' | 'tired' | 'curious';
}) {
  const eyeY = mood === 'tired' ? 31 : 30;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 120">
      <Defs>
        <SvgLinearGradient id="sideFur" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
          <Stop offset="0.55" stopColor={furColor} stopOpacity="1" />
          <Stop offset="1" stopColor="#2A1B12" stopOpacity="0.16" />
        </SvgLinearGradient>
        <SvgLinearGradient id="sideBelly" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF4DF" stopOpacity="0.95" />
          <Stop offset="1" stopColor="#F4D4A4" stopOpacity="0.78" />
        </SvgLinearGradient>
      </Defs>
      <Path d="M18 72 Q21 48 47 47 L69 50 Q83 55 85 71 Q86 91 70 99 L31 99 Q14 91 18 72 Z" fill="url(#sideFur)" stroke="#fff" strokeWidth="2" />
      <Path d="M20 70 Q7 61 12 48 Q20 37 27 51" stroke="url(#sideFur)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <Ellipse cx="55" cy="77" rx="16" ry="18" fill="url(#sideBelly)" opacity="0.88" />
      <Path d="M32 94 L28 111 Q34 116 40 111 L40 94 Z" fill="url(#sideFur)" stroke="#fff" strokeWidth="1" />
      <Path d="M63 94 L60 111 Q66 116 72 111 L72 94 Z" fill="url(#sideFur)" stroke="#fff" strokeWidth="1" />
      <Path d="M45 33 Q51 15 69 16 Q87 17 94 34 Q99 48 87 59 Q75 70 57 61 Q44 55 45 33 Z" fill="url(#sideFur)" stroke="#fff" strokeWidth="2" />
      <Ellipse cx="55" cy="24" rx={style === 'fluffy' ? 12 : 9} ry={style === 'fluffy' ? 18 : 14} fill="url(#sideFur)" transform="rotate(-30 55 24)" stroke="#fff" strokeWidth="1" />
      <Path d="M78 36 Q91 38 96 45 Q91 52 77 50 Q66 47 62 42 Q68 37 78 36 Z" fill="#FFF2DC" />
      <Ellipse cx="88" cy="42" rx="4.5" ry="3.8" fill="#2A160E" />
      <Circle cx="86.5" cy="40.3" r="0.8" fill="#fff" opacity="0.55" />
      <Circle cx="70" cy={eyeY} r="6" fill="#fff" />
      <Circle cx="70" cy={eyeY} r="4.3" fill="#7A3D15" />
      <Circle cx="70" cy={eyeY} r="2.6" fill="#1F120A" />
      <Circle cx="68.5" cy={eyeY - 2} r="1.4" fill="#fff" />
      <Path d="M62 18 Q67 14 72 18" stroke="#FFF2DC" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      {mood !== 'tired' && (
        <>
          <Path d="M84 50 Q79 56 70 53" stroke="#3A2A1A" strokeWidth="1.6" fill="none" />
          <Path d="M77 53 Q82 62 88 55 Q82 58 77 53 Z" fill="#FF5D72" opacity="0.92" />
        </>
      )}
      {mood === 'tired' && <Path d="M83 50 Q78 47 73 50" stroke="#3A2A1A" strokeWidth="1.6" fill="none" />}
      <Path d="M36 111 Q39 108 42 111" stroke="#3A2A1A" strokeWidth="1" fill="none" opacity="0.45" />
      <Path d="M66 111 Q69 108 72 111" stroke="#3A2A1A" strokeWidth="1" fill="none" opacity="0.45" />
    </Svg>
  );
}
