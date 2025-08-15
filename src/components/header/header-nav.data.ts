export type HeaderNavDataItem = {
  component: "nav-item" | "nav-group" | "logo" | "button" | "icon" | "image";
  name: string;
  href?: string;
  isDropdown?: boolean;
  icon?: {
    class?: string;
    name: string;
  };
  group?: HeaderNavDataItem[];
};

export type HeaderNavData = HeaderNavDataItem[];
export const headerNavData: HeaderNavData = [
  {
    component: "nav-group",
    name: "Links",
    group: [
      {
        component: "nav-item",
        name: "Home",
        href: "/home",
      },
      {
        component: "nav-item",
        name: "Pages",
        isDropdown: true,
        icon: {
          name: "chevron",
        },
        group: [
          {
            component: "nav-item",
            name: "Account",
            href: "/account",
          },
          {
            component: "nav-item",
            name: "Contact Us",
            href: "/contact-us",
          },
          {
            component: "nav-item",
            name: "Privacy Policy",
            href: "/privacy-policy",
          },
        ],
      },
    ],
  },

  {
    component: "nav-item",
    name: "User",
    isDropdown: true,
    icon: {
      name: "chevron",
    },
    group: [
      {
        component: "nav-item",
        name: "Login",
        href: "/login",
      },
      {
        component: "nav-item",
        name: "Register",
        href: "/register",
      },
      {
        component: "nav-item",
        name: "Profile",
        href: "/profile",
      },
    ],
  },
  {
    component: "icon",
    name: "Notification",
  },
];
