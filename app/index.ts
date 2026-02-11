// Dashboard Components
export { Dashboard } from './features/dashboard/dashboard';

// Dashboard Sections
export { OrganizationInfo, type Organization } from './features/dashboard/sections/OrganizationInfo';
export { QuickStats, type Stat } from './features/dashboard/sections/QuickStats';
export { QuickActions, type QuickAction } from './features/dashboard/sections/QuickActions';
export { RecentProjects, type Project } from './features/dashboard/sections/RecentProjects';
export { RecentActivity, type Activity } from './features/dashboard/sections/RecentActivity';

// Shared Components
export { Sidebar, type NavItem } from './components/shared/sidebar';

// UI Components
export { Button } from './components/ui/button';
export { Card } from './components/ui/card';
export { Input } from './components/ui/input';
export { Textarea } from './components/ui/text-area';
export { Toggle } from './components/ui/toggle';
export { Slider } from './components/ui/slider';
export { Avatar } from './components/ui/avatar';
export { Badge } from './components/ui/badge';
export { Progress } from './components/ui/progress';
export { Tag } from './components/ui/tag';
export { ActionMenu, type ActionMenuItem } from './components/ui/action-menu';
export { ExpandableCard, type ExpandableCardProps } from './components/ui/expandable-card';

// Utils & Helpers
export { 
  cn, 
  isClientSide, 
  isServerSide,
  appendSearchParams,
  removeLocaleFromPathname,
  prefixPathWithLocale,
  getCurrentLocaleFromPathname,
  transformToFormData,
  formatTime,
  formatDateDDMMYYYY
} from './utils/helpers';
