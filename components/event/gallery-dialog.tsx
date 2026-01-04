"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NewsFeedPicture } from "@/components/event/types";
import { safeAssetUrl } from "@/lib/asset-utils";

interface GalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pictures: NewsFeedPicture[];
  initialIndex?: number;
}

export function GalleryDialog({
  open,
  onOpenChange,
  pictures,
  initialIndex = 0,
}: GalleryDialogProps) {
  const [galleryIndex, setGalleryIndex] = useState(initialIndex);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isInitialSetup = useRef(true);
  const prevGalleryOpen = useRef(false);

  // Update galleryIndex when initialIndex prop changes (e.g., when opening with new pictures)
  useEffect(() => {
    if (open) {
      const validIndex = Math.max(
        0,
        Math.min(initialIndex, pictures.length - 1)
      );
      setGalleryIndex(validIndex);
      isInitialSetup.current = true;
    }
  }, [open, initialIndex, pictures.length]);

  // Detect when dialog opens (transitions from closed to open)
  useEffect(() => {
    if (open && !prevGalleryOpen.current) {
      // Dialog just opened - reset flag for initial setup
      isInitialSetup.current = true;
    }
    prevGalleryOpen.current = open;
  }, [open]);

  // Clear carousel API when dialog closes
  useEffect(() => {
    if (!open) {
      setCarouselApi(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!carouselApi) return;

    if (isInitialSetup.current) {
      // Initial setup: jump to index without animation
      carouselApi.scrollTo(galleryIndex, true);
      isInitialSetup.current = false;
    } else {
      // Navigation while dialog is open: scroll with animation
      carouselApi.scrollTo(galleryIndex);
    }
  }, [carouselApi, galleryIndex]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      const selected = carouselApi.selectedScrollSnap();
      setGalleryIndex(selected);
    };
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!open || !carouselApi) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        carouselApi.scrollNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        carouselApi.scrollPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, carouselApi]);

  if (!pictures || pictures.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>Event photos</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 flex items-center relative">
            <Carousel
              setApi={setCarouselApi}
              className="w-full"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {pictures.map((pic) => {
                  const fullSrc = safeAssetUrl(pic.url || pic.thumb);
                  if (!fullSrc) return null;
                  return (
                    <CarouselItem key={pic.id ?? pic.url}>
                      <div className="flex justify-center items-center w-full h-full">
                        <div className="relative max-h-[60vh] max-w-full w-auto">
                          <Image
                            alt="Event photo"
                            src={fullSrc}
                            width={1200}
                            height={900}
                            className="rounded-md object-contain max-h-[60vh] max-w-full w-auto h-auto"
                            unoptimized
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="!left-2 cursor-pointer" />
              <CarouselNext className="!right-2 cursor-pointer" />
            </Carousel>
          </div>

          <div className="shrink-0 flex gap-2 overflow-x-auto pb-1 pt-1">
            {pictures.map((pic, index) => {
              const thumbSrc = safeAssetUrl(pic.thumb || pic.url);
              if (!thumbSrc) return null;
              const isActive = index === galleryIndex;
              return (
                <button
                  key={pic.id ?? pic.url}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border cursor-pointer ${
                    isActive
                      ? "border-primary ring-2 ring-primary/50"
                      : "border-border"
                  }`}
                >
                  <Image
                    alt="Event photo thumbnail"
                    src={thumbSrc}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
