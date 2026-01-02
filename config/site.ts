export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SoccerNexus",
  description: "Your ultimate soccer management platform.",
  navItems: [
    {
      label: "Spieler anmelden",
      href: "/"
    },
    {
      label: "Spieler registrieren",
      href: "/registerNewPlayer"
    },
    {
      label: "Admin",
      href: "/admin"
    }
  ],
  navMenuItems: [
    {
      label: "Spieler anmelden",
      href: "/"
    },
    {
      label: "Spieler registrieren",
      href: "/registerNewPlayer"
    },
    {
      label: "Admin",
      href: "/admin"
    }
  ],
  links: {
    sponsor: "https://paypal.me/tommytrancong3?country.x=DE&locale.x=de_DE"
  }
};
