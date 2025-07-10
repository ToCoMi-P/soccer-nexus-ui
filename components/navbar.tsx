"use client";

import { Navbar as NextUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarItem, NavbarMenuItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { PayPalFilledIcon } from "@/components/icons";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [click, setClicks] = useState(0);
  const pathname = usePathname();

  const countClicks = () => {
    const newClicks = click + 1;
    setClicks(newClicks);
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/payPalClicks", {
      method: "POST",
      body: JSON.stringify({ payPalClicks: newClicks }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-gradient-to-r from-green-600 to-blue-700 dark:from-green-700 dark:to-blue-800 shadow-lg" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="hidden sm:flex gap-1 md:gap-2 lg:gap-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:font-bold", "text-white hover:text-gray-200", "transition-colors duration-200", "px-2 py-1 md:px-3 md:py-2 rounded-md", "text-xs sm:text-sm md:text-base", pathname === item.href ? "bg-black/20 font-bold" : "")} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-1 md:gap-2" justify="end">
        <NavbarItem>
          <Button isExternal as={Link} className="text-xs sm:text-sm md:text-base font-bold text-white bg-black/20 hover:bg-black/30" href={siteConfig.links.sponsor} startContent={<PayPalFilledIcon className="text-yellow-400" />} variant="flat" onClick={countClicks} size="sm">
            Bezahlen
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-1" justify="end">
        <Button isExternal as={Link} className="text-xs font-bold text-white bg-black/20 hover:bg-black/30 mr-1" href={siteConfig.links.sponsor} startContent={<PayPalFilledIcon className="text-yellow-400" />} variant="flat" onClick={countClicks} size="sm">
          Bezahlen
        </Button>
        <ThemeSwitch />
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarMenu className="bg-gradient-to-b from-green-600 to-blue-700 pt-3">
        <div className="mx-2 flex flex-col gap-1">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink className={clsx("w-full text-white hover:bg-black/20 px-3 py-2 rounded-md", "transition-colors duration-200", "text-sm", pathname === item.href ? "font-bold bg-black/20" : "")} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
