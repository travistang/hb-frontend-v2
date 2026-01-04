import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
};
export const LoadingSpinner = ({ className }: Props) => {
  return (
    <Loader2 className={cn("animate-spin h-8 w-8 text-gray-900", className)} />
  );
};
