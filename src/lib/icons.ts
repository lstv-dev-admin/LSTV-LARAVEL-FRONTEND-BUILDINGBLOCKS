import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

export function getLucideIcons(name?: string) {
    if (!name) return LucideIcons.LayoutDashboard;
    return (LucideIcons[name as IconName] ?? LucideIcons.LayoutDashboard) as LucideIcons.LucideIcon;
}