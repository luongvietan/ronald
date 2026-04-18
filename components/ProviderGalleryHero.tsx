"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type Props = {
  images: string[];
  providerName: string;
};

function GalleryTile({
  src,
  alt,
  onOpen,
  priority,
  overlay,
  className,
}: {
  src: string;
  alt: string;
  onOpen: () => void;
  priority?: boolean;
  overlay?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative block min-h-0 min-w-0 overflow-hidden rounded-xl bg-surface-container text-left outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className ?? ""}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority={priority} />
      {overlay}
    </button>
  );
}

export default function ProviderGalleryHero({ images, providerName }: Props) {
  const t = useTranslations("providerPage");
  const dialogTitleId = useId();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const n = images.length;

  const openAt = useCallback((index: number) => {
    setLightboxIndex(Math.max(0, Math.min(index, images.length - 1)));
    setLightboxOpen(true);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i < n - 1 ? i + 1 : i));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, n]);

  if (n === 0) return null;

  const moreCount = n > 5 ? n - 5 : 0;

  const overlayMore =
    moreCount > 0 ? (
      <span className="absolute inset-0 flex items-center justify-center bg-black/50">
        <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-on-surface shadow-md">
          {t("viewPhotosCount", { count: n })}
        </span>
      </span>
    ) : null;

  /* —— 1 image —— */
  if (n === 1) {
    return (
      <>
        <div className="w-full px-4 py-3 md:px-8 md:py-4">
          <GalleryTile
            src={images[0]}
            alt={t("photoAlt", { name: providerName, n: 1 })}
            onOpen={() => openAt(0)}
            priority
            className="aspect-[4/3] w-full max-h-[70vh] md:aspect-[21/9] md:max-h-[min(480px,70vh)]"
          />
        </div>
        <GalleryLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={images}
          providerName={providerName}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          titleId={dialogTitleId}
        />
      </>
    );
  }

  /* —— 2 images —— */
  if (n === 2) {
    return (
      <>
        <div className="grid h-[min(52vw,280px)] grid-cols-2 gap-2 px-4 py-3 md:h-[min(36vw,480px)] md:px-8 md:py-4">
          <GalleryTile
            src={images[0]}
            alt={t("photoAlt", { name: providerName, n: 1 })}
            onOpen={() => openAt(0)}
            priority
            className="h-full min-h-[140px]"
          />
          <GalleryTile
            src={images[1]}
            alt={t("photoAlt", { name: providerName, n: 2 })}
            onOpen={() => openAt(1)}
            className="h-full min-h-[140px]"
          />
        </div>
        <GalleryLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={images}
          providerName={providerName}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          titleId={dialogTitleId}
        />
      </>
    );
  }

  /* —— 3 images —— */
  if (n === 3) {
    return (
      <>
        <div className="grid h-[min(70vw,320px)] grid-cols-2 grid-rows-2 gap-2 px-4 py-3 md:h-[min(36vw,480px)] md:px-8 md:py-4">
          <GalleryTile
            src={images[0]}
            alt={t("photoAlt", { name: providerName, n: 1 })}
            onOpen={() => openAt(0)}
            priority
            className="row-span-2 h-full min-h-[160px]"
          />
          <GalleryTile
            src={images[1]}
            alt={t("photoAlt", { name: providerName, n: 2 })}
            onOpen={() => openAt(1)}
            className="h-full min-h-[76px] md:min-h-0"
          />
          <GalleryTile
            src={images[2]}
            alt={t("photoAlt", { name: providerName, n: 3 })}
            onOpen={() => openAt(2)}
            className="h-full min-h-[76px] md:min-h-0"
          />
        </div>
        <GalleryLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={images}
          providerName={providerName}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          titleId={dialogTitleId}
        />
      </>
    );
  }

  /* —— 4 images —— */
  if (n === 4) {
    return (
      <>
        <div className="grid grid-cols-2 gap-2 px-4 py-3 md:h-[min(36vw,480px)] md:grid-cols-4 md:grid-rows-2 md:px-8 md:py-4">
          <GalleryTile
            src={images[0]}
            alt={t("photoAlt", { name: providerName, n: 1 })}
            onOpen={() => openAt(0)}
            priority
            className="col-span-2 aspect-[16/10] min-h-[120px] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-0 md:h-full"
          />
          <GalleryTile
            src={images[1]}
            alt={t("photoAlt", { name: providerName, n: 2 })}
            onOpen={() => openAt(1)}
            className="aspect-square min-h-[88px] md:col-start-3 md:row-start-1 md:aspect-auto md:min-h-0 md:h-full"
          />
          <GalleryTile
            src={images[2]}
            alt={t("photoAlt", { name: providerName, n: 3 })}
            onOpen={() => openAt(2)}
            className="aspect-square min-h-[88px] md:col-start-4 md:row-start-1 md:aspect-auto md:min-h-0 md:h-full"
          />
          <GalleryTile
            src={images[3]}
            alt={t("photoAlt", { name: providerName, n: 4 })}
            onOpen={() => openAt(3)}
            className="col-span-2 aspect-[2/1] min-h-[96px] md:col-span-2 md:col-start-3 md:row-start-2 md:aspect-auto md:min-h-0 md:h-full"
          />
        </div>
        <GalleryLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={images}
          providerName={providerName}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          titleId={dialogTitleId}
        />
      </>
    );
  }

  /* —— 5+ images —— */
  return (
    <>
      <div className="grid grid-cols-2 gap-2 px-4 py-3 md:h-[min(36vw,480px)] md:grid-cols-4 md:grid-rows-2 md:px-8 md:py-4">
        <GalleryTile
          src={images[0]}
          alt={t("photoAlt", { name: providerName, n: 1 })}
          onOpen={() => openAt(0)}
          priority
          className="col-span-2 aspect-[16/10] min-h-[120px] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-0 md:h-full"
        />
        <GalleryTile
          src={images[1]}
          alt={t("photoAlt", { name: providerName, n: 2 })}
          onOpen={() => openAt(1)}
          className="aspect-square min-h-[80px] md:col-start-3 md:row-start-1 md:aspect-auto md:min-h-0 md:h-full"
        />
        <GalleryTile
          src={images[2]}
          alt={t("photoAlt", { name: providerName, n: 3 })}
          onOpen={() => openAt(2)}
          className="aspect-square min-h-[80px] md:col-start-4 md:row-start-1 md:aspect-auto md:min-h-0 md:h-full"
        />
        <GalleryTile
          src={images[3]}
          alt={t("photoAlt", { name: providerName, n: 4 })}
          onOpen={() => openAt(3)}
          className="aspect-square min-h-[80px] md:col-start-3 md:row-start-2 md:aspect-auto md:min-h-0 md:h-full"
        />
        <GalleryTile
          src={images[4]}
          alt={t("photoAlt", { name: providerName, n: 5 })}
          onOpen={() => openAt(4)}
          overlay={overlayMore}
          className="aspect-square min-h-[80px] md:col-start-4 md:row-start-2 md:aspect-auto md:min-h-0 md:h-full"
        />
      </div>
      <GalleryLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        providerName={providerName}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        titleId={dialogTitleId}
      />
    </>
  );
}

function GalleryLightbox({
  open,
  onClose,
  images,
  providerName,
  index,
  onIndexChange,
  titleId,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  providerName: string;
  index: number;
  onIndexChange: (i: number) => void;
  titleId: string;
}) {
  const t = useTranslations("providerPage");
  if (!open) return null;

  const src = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 p-2 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 pb-2 text-white">
        <h2 id={titleId} className="truncate text-sm font-semibold md:text-base">
          {t("galleryDialogTitle", { name: providerName })}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t("galleryClose")}
        >
          <X aria-hidden className="size-7" strokeWidth={2} />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image
          src={src}
          alt={t("photoAlt", { name: providerName, n: index + 1 })}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
      <div className="flex shrink-0 items-center justify-center gap-4 py-3 text-white">
        <button
          type="button"
          className="rounded-full bg-white/10 p-2 hover:bg-white/20 disabled:opacity-30"
          disabled={index <= 0}
          onClick={() => onIndexChange(index - 1)}
          aria-label={t("galleryPrev")}
        >
          <ChevronLeft aria-hidden className="size-6" strokeWidth={2} />
        </button>
        <span className="text-sm tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          className="rounded-full bg-white/10 p-2 hover:bg-white/20 disabled:opacity-30"
          disabled={index >= images.length - 1}
          onClick={() => onIndexChange(index + 1)}
          aria-label={t("galleryNext")}
        >
          <ChevronRight aria-hidden className="size-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
