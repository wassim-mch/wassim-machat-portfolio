"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PROJECTS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 3;
const PAGE_COUNT = Math.ceil(PROJECTS.length / PAGE_SIZE);

export default function Projects() {
  const t = useTranslations("projects");
  const tData = useTranslations("projectsData");
  const containerRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);

  const pageProjects = PROJECTS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useGSAP(
    () => {
      pageProjects.forEach((_, i) => {
        gsap.fromTo(
          `.project-card-${i}`,
          {
            xPercent: i % 2 === 0 ? -30 : 30,
            autoAlpha: 0,
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.project-card-${i}`,
              start: "top 80%",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [page] }
  );

  function goToPage(next: number) {
    if (next === page) return;
    setPage(next);
    // Remet le scroll sur le haut de la grille de projets pour suivre la pagination
    const grid = containerRef.current?.querySelector(".projects-grid");
    grid?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-32"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none grid-bg"
        style={{ opacity: 0.5 }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: "#60a5fa" }}
          >
            {t("label")}
          </span>
          <h2
            className="font-black mt-3 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            {t("headingPrefix")} <span className="text-gradient">{t("headingHighlight")}</span>
          </h2>
        </div>

        <div className="projects-grid space-y-8">
          {pageProjects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card-${i} group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1`}
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: 0,
              }}
            >
              {/* Hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at ${i % 2 === 0 ? "0% 50%" : "100% 50%"}, ${project.color}06 0%, transparent 70%)`,
                }}
              />

              <div
                className={`relative flex flex-col lg:flex-row ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""} items-stretch`}
              >
                {/* Visual pane — number stays, no image here */}
                <div
                  className="lg:w-5/12 min-h-64 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}12, ${project.color}04)`,
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    borderLeft: i % 2 !== 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div
                    className="absolute inset-0 grid-bg pointer-events-none"
                    style={{ opacity: 0.6 }}
                  />

                  <div className="relative z-10 text-center px-8">
                    <div
                      className="text-8xl font-black mb-3 leading-none"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: `1px ${project.color}40`,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {project.id}
                    </div>
                    <div
                      className="text-xs font-bold tracking-[0.25em] uppercase"
                      style={{ color: project.color }}
                    >
                      {tData(`${project.key}.subtitle`)}
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${project.color}15, transparent)`,
                      filter: "blur(20px)",
                    }}
                  />
                </div>

                {/* Content pane */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ color: project.color }}
                  >
                    {t("projectLabel", { id: project.id })}
                  </div>

                  <h3
                    className="font-black mb-4 leading-tight"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
                  >
                    {tData(`${project.key}.title`)}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-6 max-w-md"
                    style={{ color: "#a1a1aa" }}
                  >
                    {tData(`${project.key}.desc`)}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {tData.raw(`${project.key}.features`).map((f: string) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "#a1a1aa" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: project.color }}
                        />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
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

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    {project.url !== "#" && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        style={{ background: project.color, color: "#050505" }}
                      >
                        <ExternalLink size={14} />
                        {t("visitProject")}
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
                      style={{ color: "#a1a1aa" }}
                    >
                      {t("learnMore")}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {PAGE_COUNT > 1 && (
          <div className="flex items-center justify-center gap-3 mt-14">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={t("goToPage", { page: i + 1 })}
                aria-current={i === page}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === page ? "28px" : "10px",
                  height: "10px",
                  background: i === page ? "#60a5fa" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}