"use client";

import Image from "next/image";
import {
  Car,
  Clock,
  ImageOff,
  Train,
  Triangle,
  ArrowRightToLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SacScaleBadge } from "@/components/common/sac-scale-badge";
import { EventCardProps, NewsFeedPicture } from "./types";
import { useRouter } from "next/navigation";
import { safeAssetUrl } from "@/lib/asset-utils";

function formatStart(value: unknown) {
  if (typeof value !== "string") return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function EventCard({
  event,
  variant = "standard",
  onOpenGallery,
}: EventCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/events/${event.id}`);
  };
  const title = event?.title ?? "Untitled";
  const startDate = formatStart(event?.start);
  const city = event?.city?.name;
  const activityName = event?.activity_name;
  const organizerName = event?.organizer?.name;
  const organizerLastName = event?.organizer?.last_name;
  const organizerPicture = safeAssetUrl(event?.organizer?.picture);

  const going = event?.attendance?.going;
  const spaces = event?.attendance?.spaces;
  const waiting = event?.attendance?.waiting;
  const isCarPool = event?.attendance?.is_car_pool;

  const route = event?.route;

  // Standard variant: single cover image
  const coverSrc =
    variant === "standard" ? safeAssetUrl(event?.cover_picture_url) : "";

  // Community variant: gallery of pictures
  const pictures =
    variant === "community" ? event?.pictures_uploaded ?? [] : [];

  const isCommunity = variant === "community";
  const isStandard = variant === "standard";

  const isPastEvent = startDate ? startDate < new Date() : false;

  return (
    <Card onClick={handleClick} className="overflow-hidden p-1">
      <CardContent
        className={isCommunity ? "flex flex-col gap-3 p-4" : "flex gap-4 p-4"}
      >
        {isStandard && (
          <div className="shrink-0">
            {coverSrc ? (
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden">
                <Image
                  alt="Event picture"
                  src={coverSrc}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted text-muted-foreground sm:h-24 sm:w-24">
                <ImageOff className="h-6 w-6" />
              </div>
            )}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <CardHeader className="gap-2 p-0">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base">{title}</CardTitle>
              {activityName && (
                <Badge variant="secondary">{activityName}</Badge>
              )}
              {typeof isCarPool === "boolean" ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  {isCarPool ? (
                    <Car className="h-3 w-3" />
                  ) : (
                    <Train className="h-3 w-3" />
                  )}
                  {isCarPool ? "Carpool" : "Public"}
                </Badge>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {startDate ? (
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1">
                  <span className="font-medium">{formatDate(startDate)}</span>
                  <span className="text-muted-foreground">at</span>
                  <span className="font-medium">{formatTime(startDate)}</span>
                </div>
              ) : null}
              {city ? (
                <Badge variant="outline" className="text-xs">
                  {city}
                </Badge>
              ) : null}
              {isPastEvent && going != null && (
                <Badge variant="outline" className="text-xs">
                  Went: {going}
                </Badge>
              )}
            </div>
          </CardHeader>

          <div className="mt-3 grid gap-3 text-sm">
            {(organizerName || organizerLastName) && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={organizerPicture}
                    alt={`${organizerName} ${organizerLastName}`}
                  />
                  <AvatarFallback>
                    {organizerName?.[0]?.toUpperCase() ||
                      organizerLastName?.[0]?.toUpperCase() ||
                      "?"}
                  </AvatarFallback>
                </Avatar>
                <span>
                  by {organizerName} {organizerLastName}
                </span>
              </div>
            )}

            {!isPastEvent &&
              (going != null ||
                spaces != null ||
                (waiting != null && spaces != null && spaces > 0)) && (
                <div className="flex flex-wrap gap-2">
                  {going != null && (
                    <Badge variant="outline">Going: {going}</Badge>
                  )}
                  {spaces != null && (
                    <Badge variant="outline">Spaces: {spaces}</Badge>
                  )}
                  {waiting != null && spaces != null && spaces === 0 && (
                    <Badge variant="outline">Waiting: {waiting}</Badge>
                  )}
                </div>
              )}

            {route && (
              <div className="flex flex-wrap items-center gap-2">
                {route?.distance != null ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ArrowRightToLine className="h-3 w-3" />
                    {route.distance} km
                  </Badge>
                ) : null}
                {route?.elevation_gain != null ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Triangle className="h-3 w-3" />
                    {route.elevation_gain} m
                  </Badge>
                ) : null}
                {route?.duration ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {route.duration}
                  </Badge>
                ) : null}
                <SacScaleBadge value={route?.sac_scale} />
              </div>
            )}

            {/* Gallery (community variant only) */}
            {isCommunity && pictures.length > 0 && onOpenGallery && (
              <div className="mt-1 grid">
                <div className="mb-1 text-xs font-medium text-muted-foreground">
                  Photos
                </div>
                <div
                  className="flex gap-2 overflow-x-auto pb-1"
                  style={{
                    maskImage:
                      "linear-gradient(to right, black calc(100% - 2rem), transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, black calc(100% - 2rem), transparent 100%)",
                  }}
                >
                  {pictures.map((pic: NewsFeedPicture, index: number) => {
                    const thumbSrc = safeAssetUrl(pic.thumb || pic.url);
                    return (
                      <button
                        key={pic.id ?? pic.url}
                        type="button"
                        className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md border bg-muted cursor-pointer"
                        onClick={() => onOpenGallery(pictures, index)}
                      >
                        {thumbSrc ? (
                          <Image
                            alt="Event photo thumbnail"
                            src={thumbSrc}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
