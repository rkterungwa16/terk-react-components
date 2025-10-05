export type NavDataItem = {
  component: 'nav-item' | 'nav-group' | 'subtitle';
  name: string;
  href?: string;
  icon?: {
    class?: string;
    name: string;
  };
  badge?: {
    color: string;
    text: string;
  };
};

export type NavData = NavDataItem[];
export const navData: NavData = [
  {
    component: "nav-item",
    name: "Dashboard",
    href: "/",
  },
  {
    component: "subtitle",
    name: "Base",
  },
  {
    component: "nav-item",
    name: "Cards",
    href: "/base/cards",
  },
  {
    component: "subtitle",
    name: "Buttons",
  },
  {
    component: "nav-item",
    name: "Button",
    href: "/buttons/button",
  },
];
