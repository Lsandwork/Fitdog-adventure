import type { AccessoryId } from './types';

export type AccessorySlot = 'back' | 'neck' | 'face' | 'head';

export interface AccessoryMeta {
  id: AccessoryId;
  slot: AccessorySlot;
  layer: number;
  label: string;
}

/** Render order: lower layer draws first (behind). */
export const ACCESSORY_META: Record<AccessoryId, AccessoryMeta> = {
  backpack: { id: 'backpack', slot: 'back', layer: 0, label: 'Trail Pack' },
  bandana: { id: 'bandana', slot: 'neck', layer: 1, label: 'Red Bandana' },
  bowtie: { id: 'bowtie', slot: 'neck', layer: 2, label: 'Fancy Bowtie' },
  sunglasses: { id: 'sunglasses', slot: 'face', layer: 3, label: 'Cool Shades' },
  crown: { id: 'crown', slot: 'head', layer: 4, label: 'Goodest Crown' },
};

export function sortAccessories(ids: AccessoryId[]): AccessoryId[] {
  return [...ids].sort((a, b) => ACCESSORY_META[a].layer - ACCESSORY_META[b].layer);
}
