import { TRoute, TRoutePath } from '../types';

export const routesGenerator = (paths: TRoutePath[]) => {
  return paths.reduce((acc: TRoute[], path) => {
    if (path.path && path.element) {
      acc.push({
        path: path.path,
        element: path.element,
      });
    }
    if (path.children) {
      path.children
        .filter(child => child?.path)
        .forEach(child =>
          acc.push({
            path: child.path!,
            element: child.element,
          })
        );
    }

    return acc;
  }, []);
};
