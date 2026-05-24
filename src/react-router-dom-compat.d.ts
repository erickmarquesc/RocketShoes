import 'react-router-dom';

declare module 'react-router-dom' {
  interface MemoryRouterProps {
    children?: import('react').ReactNode;
  }
  interface BrowserRouterProps {
    children?: import('react').ReactNode;
  }
  interface SwitchProps {
    children?: import('react').ReactNode;
  }
  interface RouteProps {
    children?: import('react').ReactNode | ((props: import('react-router').RouteChildrenProps) => import('react').ReactNode);
  }
  interface LinkProps<S = unknown> {
    children?: import('react').ReactNode;
  }
}
