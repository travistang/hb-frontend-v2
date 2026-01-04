"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/services/event-service/types";
import { Eye } from "lucide-react";
import { useState } from "react";

type Props = {
  participants: User[];
  waitlisted: User[];
};

const UserItem = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.picture} />
        <AvatarFallback>{user.name?.[0]?.toUpperCase() || "--"}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
};
export const ParticipantListDialog = ({ participants, waitlisted }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="self-end bg-transparent h-6 self-end ml-auto"
        onClick={() => setIsOpen(true)}
      >
        <Eye />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participants</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="participants">
                  Participants ({participants.length})
                </TabsTrigger>
                <TabsTrigger
                  disabled={waitlisted.length === 0}
                  value="waitlisted"
                >
                  Waitlisted ({waitlisted.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="participants"
                className="flex flex-col flex-wrap gap-2"
              >
                {participants.map((participant) => (
                  <UserItem key={participant.id} user={participant} />
                ))}
              </TabsContent>
              <TabsContent
                value="waitlisted"
                className="flex flex-col flex-wrap gap-2"
              >
                {waitlisted.map((participant) => (
                  <UserItem key={participant.id} user={participant} />
                ))}
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
