import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PROJECTS } from "@/data";
import { routing } from "@/i18n/routing";
import ProjectGallery from "@/components/ui/ProjectGallery";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, id: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const project = PROJECTS.find((p) => p.slug === id);
  if (!project) return {};

  const tData = await getTranslations({ locale, namespace: "projectsData" });
  return {
    title: `${tData(`${project.key}.title`)} — Wassim Machat`,
    description: tData(`${project.key}.desc`),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const project = PROJECTS.find((p) => p.slug === id);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const tData = await getTranslations({ locale, namespace: "projectsData" });

  const currentIndex = PROJECTS.findIndex((p) => p.slug === id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const title = tData(`${project.key}.title`);
  const subtitle = tData(`${project.key}.subtitle`);
  const desc = tData(`${project.key}.desc`);
  const longDesc = tData(`${project.key}.longDesc`);
  const features = tData.raw(`${project.key}.features`) as string[];
  const prevTitle = tData(`${prevProject.key}.title`);
  const nextTitle = tData(`${nextProject.key}.title`);

  return (
    <main className="relative min-h-screen" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute inset-0 pointer-events-none grid-bg"
        style={{ opacity: 0.4 }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium mb-12 transition-all duration-200 hover:gap-3"
          style={{ color: "#a1a1aa" }}
        >
          <ArrowLeft size={14} />
          {t("backToProjects")}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: project.color }}
          >
            {t("projectLabel", { id: project.id })} — {subtitle}
          </div>
          <h1
            className="font-black leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            {title}
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#a1a1aa" }}>
            {desc}
          </p>
        </div>

        {/* Image gallery */}
        <ProjectGallery images={project.images} alt={title} accent={project.color} />

        <div className="grid md:grid-cols-3 gap-12">
          {/* Long description */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#fff" }}>
              {t("aboutThisProject")}
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#a1a1aa" }}>
              {longDesc}
            </p>

            {project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl mt-8 transition-all duration-300 hover:scale-105"
                style={{ background: project.color, color: "#050505" }}
              >
                <ExternalLink size={14} />
                {t("visitProject")}
              </a>
            )}
          </div>

          {/* Sidebar: features + tags */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#fff" }}>
              {t("keyFeatures")}
            </h2>
            <div className="space-y-3 mb-10">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "#a1a1aa" }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: project.color }}
                  />
                  {f}
                </div>
              ))}
            </div>

            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#fff" }}>
              {t("builtWith")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-lg font-medium"
                  style={{
                    background: `${project.color}12`,
                    color: project.color,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div
          className="flex items-center justify-between mt-20 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="text-sm font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "#a1a1aa" }}
          >
            ← {prevTitle}
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-sm font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "#a1a1aa" }}
          >
            {nextTitle} →
          </Link>
        </div>
      </div>
    </main>
  );
}