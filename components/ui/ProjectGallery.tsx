"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({
  images,
  alt,
  accent,
}: {
  images: string[];
  alt: string;
  accent: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  // Navigation clavier dans le lightbox (Echap, flèches)
  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  // Une seule image : pleine largeur, pas de grille
  if (images.length === 1) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 cursor-zoom-in"
          style={{
            background: `linear-gradient(135deg, ${accent}12, ${accent}04)`,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Image
            src={images[0]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </button>
        {openIndex !== null && (
          <Lightbox
            images={images}
            index={openIndex}
            alt={alt}
            onClose={close}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </>
    );
  }

  // 2 à 4 images : grille de miniatures, toutes visibles
  return (
    <>
      <div
        className={`grid gap-4 mb-12 ${
          images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"
        }`}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-video rounded-2xl overflow-hidden cursor-zoom-in group"
            style={{
              background: `linear-gradient(135deg, ${accent}12, ${accent}04)`,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src={src}
              alt={`${alt} — image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 512px"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          alt={alt}
          onClose={close}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  index,
  alt,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(5,5,5,0.92)" }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 p-2 rounded-full transition-colors hover:bg-white/10"
        style={{ color: "#fff" }}
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors hover:bg-white/10"
            style={{ color: "#fff" }}
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors hover:bg-white/10"
            style={{ color: "#fff" }}
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}

      <div
        className="relative w-full max-w-4xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} — image ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {images.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
        >
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}