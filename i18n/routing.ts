import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always", // toujours /fr, /en ou /ar dans l'URL (clair pour le SEO et les liens partagés)
});

// Link / useRouter / usePathname / redirect "intl-aware" à utiliser partout
// à la place des équivalents next/navigation et next/link.
export const { Link, useRouter, usePathname, redirect } = createNavigation(routing);