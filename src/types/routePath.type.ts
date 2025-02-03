import { ReactNode } from 'react';

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TRoutePath = {
  path?: string;
  element?: ReactNode;
  children?: TRoutePath[];
};
