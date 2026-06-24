const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'export'` retiré : next-intl a besoin du middleware (routing par locale,
  // détection de langue), ce qui nécessite un déploiement serveur/edge — Vercel le gère nativement.
  images: {
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);