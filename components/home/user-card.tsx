"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface UserCardProps {
  firstName: string;
  profilePicture?: string;
  level?: string;
  points?: number;
  isLoading?: boolean;
}

export function UserCard({ firstName, profilePicture, level, points, isLoading = false }: UserCardProps) {
  return (
    <Card className="mb-6 border-emerald-200 bg-emerald-50/50">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profilePicture} alt={firstName} />
            <AvatarFallback>{firstName.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0">
            <div className="text-lg font-semibold">Welcome, {firstName}</div>
            <div className="text-sm text-muted-foreground">
              {level ? <span>{level}</span> : null}
              {level && points != null ? <span> · </span> : null}
              {points != null ? <span>{points} points</span> : null}
            </div>
          </div>
        </div>
        {isLoading ? <Badge variant="secondary">Loading…</Badge> : null}
      </CardContent>
    </Card>
  );
}

