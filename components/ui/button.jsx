import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-sky-400 text-ink-900 hover:bg-sky-300",
  ghost: "border border-sky-400/40 text-sky-200 hover:bg-sky-300/10"
};

export function Button({ className, variant = "primary", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
