import { NavLink } from 'react-router-dom';
import { TSidebarItem, TSidebarNav } from '../types';

export const sidebarNavsGenerator = (navs: TSidebarNav[], role: string) => {
  return navs.reduce((acc: TSidebarItem[], nav) => {
    if (nav.name && nav.path) {
      acc.push({
        key: nav.name,
        label: <NavLink to={`/${role}/${nav.path}`}>{nav.name}</NavLink>,
      });
    }
    if (nav.children && nav.name) {
      acc.push({
        key: nav.name,
        label: nav.name,
        children: nav.children
          .filter(child => child?.name)
          .map(child => ({
            key: child.name!,
            label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
          })),
      });
    }

    return acc;
  }, []);
};
