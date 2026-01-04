import { cn } from "@/lib/utils";

type RecognizedEnvironment = "staging" | "local" | "preview" | "production";
const environmentConfig: Partial<
  Record<RecognizedEnvironment, { label: string; backgroundColor: string }>
> = {
  staging: {
    label: "Staging",
    backgroundColor: "bg-chart-5",
  },
  preview: {
    label: "Preview",
    backgroundColor: "bg-chart-4",
  },
  local: {
    label: "Local",
    backgroundColor: "bg-chart-1",
  },
};
export const EnvironmentBadge = () => {
  const environment: RecognizedEnvironment =
    (process.env.NEXT_PUBLIC_ENVIRONMENT as RecognizedEnvironment) ??
    "production";
  const config = environmentConfig[environment];
  if (!config) {
    return null;
  }
  const { label, backgroundColor } = config;
  return (
    <div
      aria-hidden
      className={cn(
        "fixed top-0 left-0 p-2 rounded-br-lg text-white font-medium",
        backgroundColor
      )}
    >
      {label}
    </div>
  );
};
