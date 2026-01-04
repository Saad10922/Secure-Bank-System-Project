import { cn } from "./utils";
function Textarea({ className, ...props }) {
  return <textarea
    data-slot="textarea"
    className={cn(
      "resize-none border-slate-200 placeholder:text-slate-500 focus-visible:border-slate-800 focus-visible:ring-slate-800/50 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 flex field-sizing-content min-h-16 w-full rounded-md border bg-white px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className
    )}
    {...props}
  />;
}
export { Textarea };
