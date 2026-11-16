import { AlertTriangle, BadgeCheck, Send, ShieldCheck } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

export type IconKey = 'badge' | 'shield' | 'alert' | 'send';

const map: Record<IconKey, LucideIcon> = {
  badge: BadgeCheck,
  shield: ShieldCheck,
  alert: AlertTriangle,
  send: Send,
};

export const iconFor = (key: IconKey): LucideIcon => map[key];
