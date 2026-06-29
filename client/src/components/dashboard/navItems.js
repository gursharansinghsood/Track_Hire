import { FiBarChart2, FiHome, FiLogOut, FiPlusSquare, FiSettings, FiUser } from 'react-icons/fi'

export const NAV_ITEMS = [
    { key: 'home', label: 'Dashboard', href: '/dashboard', icon: FiHome },
    { key: 'jobs', label: 'Add Application', href: '/dashboard/jobs/new', icon: FiPlusSquare },
    { key: 'analytics', label: 'Statistics', href: '/dashboard/analytics', icon: FiBarChart2 },
    { key: 'profile', label: 'Profile', href: '/dashboard/profile', icon: FiUser },
    { key: 'settings', label: 'Settings', href: '/dashboard/settings', icon: FiSettings },
    { key: 'logout', label: 'Logout', href: '/dashboard/logout', icon: FiLogOut },
]






