import { ReactNode } from 'react';

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TSidebarNav = {
  name?: string;
  path?: string;
  label?: ReactNode;
  children?: TSidebarNav[];
};
