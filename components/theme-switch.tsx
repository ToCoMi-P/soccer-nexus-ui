"use client";

import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { useState } from "react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch = ({ className, classNames }: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const [click, setClicks] = useState(0);

  const onChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const newClicks = click + 1;
    setClicks(newClicks);
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/darkModeClicks", {
      method: "POST",
      body: JSON.stringify({ darkModeClicks: newClicks }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx("px-px transition-all hover:scale-110 cursor-pointer", className, classNames?.base)
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(["w-auto h-auto", "bg-transparent", "rounded-full", "flex items-center justify-center", "group-data-[selected=true]:bg-transparent", "text-white", "p-1"], classNames?.wrapper)
        })}
      >
        {!isSelected || isSSR ? <SunFilledIcon size={20} className="text-yellow-300" /> : <MoonFilledIcon size={20} className="text-blue-200" />}
      </div>
    </Component>
  );
};
