import {
  LayoutDashboard, BarChart2, FolderKanban,
  Users, FileText, MessageSquare, Settings
} from 'lucide-react';

export const navData = [
  {
    section: 'main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics', badge: 3 },
      {
        id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects',
        children: [
          { id: 'projects-all',      label: 'All projects', path: '/projects/all' },
          { id: 'projects-active',   label: 'Active',       path: '/projects/active' },
          { id: 'projects-archived', label: 'Archived',     path: '/projects/archived' },
        ]
      },
      {
        id: 'team', label: 'Team', icon: Users, path: '/team',
        children: [
          { id: 'team-members', label: 'Members',             path: '/team/members' },
          { id: 'team-roles',   label: 'Roles & permissions', path: '/team/roles' },
        ]
      },
    ]
  },
  {
    section: 'workspace',
    items: [
      { id: 'files',    label: 'Files',    icon: FileText,       path: '/files' },
      { id: 'messages', label: 'Messages', icon: MessageSquare,  path: '/messages', badge: 12 },
      { id: 'settings', label: 'Settings', icon: Settings,       path: '/settings' },
    ]
  }
];