export interface NavigationItems {
  label: string;
  href: string;
  items: Links[];
}

export interface Links {
  name: string;
  slug: string;
}
