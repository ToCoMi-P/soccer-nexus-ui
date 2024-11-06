export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "SoccerNexus",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Spielerliste",
      href: "/registerNewPlayer",
    },
    {
      label: "Admin",
      href: "/admin",
    },
    /*{
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    }*/
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Spielerliste",
			href: "/registerNewPlayer",
		},
		{
			label: "Admin",
			href: "/admin",
		},
		/*{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},*/
	],
	links: {
		github: "https://github.com/ToCoMi-P/soccer-nexus-ui.git",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    	sponsor: "https://paypal.me/tommytrancong3?country.x=DE&locale.x=de_DE",

	},
};
