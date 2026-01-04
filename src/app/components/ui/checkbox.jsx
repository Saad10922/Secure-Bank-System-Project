"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "./utils";
function Checkbox({
  className,
  ...props
}) {
  return <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      "peer border bg-white data-[state=checked]:bg-slate-900 data-[state=checked]:text-white data-[state=checked]:border-slate-900 focus-visible:border-slate-800 focus-visible:ring-slate-800/50 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current transition-none"
    >
      <CheckIcon className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>;
}
export { Checkbox };
