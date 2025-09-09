import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";      
import { cn } from "@/lib/utils";


type HeadingElement = React.ElementRef<'h1'>;
interface HeadingProps
  extends React.ComponentPropsWithoutRef<'h1'>, VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const headingVariants = cva(
  "rt-Heading font-bold tracking-tight", // base styles
  {
    variants: {
      variant: {
        default: "text-slate-800",
        accent: "bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent",
        subtle: "text-slate-500",
      },
      size: {
        xl: "text-3xl md:text-4xl",
        lg: "text-2xl md:text-3xl",
        md: "text-xl md:text-2xl",
        sm: "text-lg md:text-xl",
      },
      weight: {
        normal: "font-normal",
        bold: "font-bold",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      weight: "bold",
    },
  }
);

const Heading = React.forwardRef<HeadingElement, HeadingProps>(({ className, variant, size, weight, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp
      data-slot="heading"
      ref={ref}
      className={cn(headingVariants({ variant, size, weight, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
});
Heading.displayName = "Heading";

export { Heading, headingVariants };
export type { HeadingProps };