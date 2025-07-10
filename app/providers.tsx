// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation"; // Keep if you need navigation in HeroUIProvider

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Keep if HeroUIProvider needs navigation

  return (
    <HeroUIProvider
      navigate={router.push} // Only include if HeroUIProvider supports this prop
    >
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false} // Recommended to add
        disableTransitionOnChange // Recommended to add
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
