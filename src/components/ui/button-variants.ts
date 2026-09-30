import { cva } from "class-variance-authority";

/**
 * Button styles, shared by <Button> and by anything using `asChild`.
 *
 * Note on disabled buttons: we use `disabled:cursor-not-allowed` rather than
 * shadcn's `disabled:pointer-events-none`, because an element with no pointer
 * events cannot show a cursor at all. That means a disabled button can still be
 * hovered, so every hover style is guarded with `not-disabled:`.
 */
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow,background-color,transform] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm not-disabled:hover:bg-primary/90 not-disabled:active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm not-disabled:hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xs not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs not-disabled:hover:bg-secondary/80",
        ghost:
          "not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 not-disabled:hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
