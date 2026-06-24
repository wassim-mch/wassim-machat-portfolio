// Les libellés (label) sont gérés via les traductions (messages/*.json, namespace "nav")
// en se basant sur le href : "#home" -> nav.home, "#about" -> nav.about, etc.
export const NAV_LINKS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#services", key: "services" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
];

export const SKILLS = [
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20", level: 92 },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4", level: 90 },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", level: 88 },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", level: 85 },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", level: 82 },
  { name: "TailwindCSS", icon: "https://cdn.simpleicons.org/tailwindcss/38BDF8", level: 90 },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", level: 88 },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", level: 87 },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B", level: 78 },
  { name: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin/7F52FF", level: 72 },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", level: 80 },
  { name: "Illustrator", icon: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='4' fill='%23FF9A00'/%3E%3Ctext x='12' y='16.5' font-family='Arial,Helvetica,sans-serif' font-weight='700' font-size='10' text-anchor='middle' fill='%23330000'%3EAi%3C/text%3E%3C/svg%3E", level: 75 },
];

// Les libellés (title/desc) sont gérés via les traductions (messages/*.json, namespace "services")
export const SERVICES = [
  {
    key: "ecommerce",
    icon: "ShoppingBag",
    accent: "#a78bfa",
  },
  {
    key: "webApps",
    icon: "Globe",
    accent: "#f472b6",
  },
  {
    key: "mobileApp",
    icon: "Smartphone",
    accent: "#facc15",
  },
  {
    key: "saas",
    icon: "Cloud",
    accent: "#60a5fa",
  },
  {
    key: "crm",
    icon: "Users",
    accent: "#818cf8",
  },
  {
    key: "erp",
    icon: "BarChart3",
    accent: "#34d399",
  },
  {
    key: "api",
    icon: "Code2",
    accent: "#fb923c",
  },
  {
    key: "businessManagement",
    icon: "Briefcase",
    accent: "#60a5fa",
  },
];

// Les textes (title, subtitle, desc, longDesc, features) sont gérés via les traductions
// (messages/*.json, namespace "projectsData", clé = `key` ci-dessous).
// tags = noms de technologies, non traduits.
export const PROJECTS = [
  {
    id: "01",
    key: "rahmaniAkram",
    slug: "rahmani-akram",
    tags: ["Laravel", "React.js", "MySQL", "TailwindCSS"],
    url: "#",
    images: ["/images/6.png", "/images/7.png", "/images/8.png"],
    color: "#a78bfa",
  },
  {
    id: "02",
    key: "attafani",
    slug: "attafani",
    tags: ["Laravel", "React.js", "MySQL", "TailwindCSS"],
    url: "#",
    images: ["/images/16.png", "/images/17.png", "/images/18.png", "/images/19.png", "/images/20.png"],
    color: "#60a5fa",
  },
  {
    id: "03",
    key: "activeBuild",
    slug: "active-build",
    tags: ["Laravel", "React.js", "MySQL", "TailwindCSS"],
    url: "#",
    images: ["/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png"],
    color: "#fb923c",
  },
  {
    id: "04",
    key: "mumAndMe",
    slug: "mum-and-me",
    tags: ["Laravel", "React.js", "MySQL", "TailwindCSS"],
    url: "https://mumandme-dz.com/",
    images: ["/images/13.png", "/images/14.png"],
    color: "#f472b6",
  },
  {
    id: "05",
    key: "buildriseStudio",
    slug: "buildrise-studio",
    tags: ["Laravel", "React.js", "MySQL", "TailwindCSS"],
    url: "https://build-rise-studio.vercel.app/",
    images: ["/images/10.png", "/images/11.png"],
    color: "#34d399",
  },
  {
    id: "06",
    key: "brefcalc",
    slug: "brefcalc",
    tags: ["Flutter", "Kotlin", "Mobile"],
    url: "https://brefcalc.vercel.app/",
    images: ["/images/21.jpg", "/images/22.jpg", "/images/23.jpg", "/images/24.jpg", "/images/25.jpg"],
    color: "#02569b",
  },
];

// Les textes (text/role) sont gérés via les traductions (messages/*.json, namespace "testimonialsData")
// author = nom propre, non traduit.
export const TESTIMONIALS = [
  {
    key: "ahmedBenali",
    author: "Ahmed Benali",
    avatar: "AB",
  },
  {
    key: "sarahM",
    author: "Sarah M.",
    avatar: "SM",
  },
  {
    key: "karimHadj",
    author: "Karim Hadj",
    avatar: "KH",
  },
];

// Les libellés (title/desc) sont gérés via les traductions (messages/*.json, namespace "process")
export const PROCESS_STEPS = [
  { step: "01", key: "discovery" },
  { step: "02", key: "planning" },
  { step: "03", key: "design" },
  { step: "04", key: "development" },
  { step: "05", key: "testing" },
  { step: "06", key: "launch" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/wassim-mch", icon: "Github" },
  { label: "LinkedIn", url: "https://dz.linkedin.com/in/wassim-machat-799aab361", icon: "Linkedin" },
  { label: "Instagram", url: "https://www.instagram.com/wassim_dev_dz/", icon: "Instagram" },
  { label: "TikTok", url: "https://www.tiktok.com/@wassim_dev_dz", icon: "Music" },
  { label: "WhatsApp", url: "https://api.whatsapp.com/send/?phone=213675595880", icon: "MessageCircle" },
];