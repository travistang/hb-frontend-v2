import type { Metadata } from "next";
import { HomeBody } from "@/components/home/home-body";

export const metadata: Metadata = {
  title: "Hiking Buddies",
};

export default function Home() {
  return <HomeBody />;
}

