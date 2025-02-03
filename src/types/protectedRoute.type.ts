import { ReactNode } from 'react';

export type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};
