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
    href: "/dashboard",
  },
  {
    component: "subtitle",
    name: "Shirts",
  },
  {
    component: "nav-item",
    name: "T-Shirts",
    href: "/shirts/t-shirts",
  },
  {
    component: "subtitle",
    name: "Dresses",
  },
  {
    component: "nav-item",
    name: "A-line",
    href: "/dresses/a-line",
  },
];
