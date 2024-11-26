import { Link } from './link.interface';

export const adminLinks: Link[] = [
  {
    name: 'Manager requests',
    icon: 'fas fa-pen',
    route: './manager-requests',
    iconColor: '#5e72e4',
  },
  {
    name: 'View profile',
    icon: 'fa-solid fa-user',
    route: './profile',
    iconColor: '#5e72e4',
  },
];
