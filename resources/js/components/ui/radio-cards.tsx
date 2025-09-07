import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Root as RadioGroupRoot, Item as RadioGroupItem } from '@radix-ui/react-radio-group';

const radioCardsRootVariants = cva(
  "grid grid-cols-1 sm:grid-cols-2 gap-4"
);

const radioCardsItemVariants = cva(
  "cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md flex items-center justify-between border-border bg-card text-foreground data-[state=checked]:shadow-sm",
  {
    variants: {
      variant: {
        default: "hover:border-primary/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10",
        secondary: "hover:border-secondary data-[state=checked]:border-secondary data-[state=checked]:bg-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface RadioCardsRootProps extends React.ComponentPropsWithoutRef<typeof RadioGroupRoot> {
  className?: string;
}

interface RadioCardsItemProps 
  extends React.ComponentPropsWithoutRef<typeof RadioGroupItem>,
    VariantProps<typeof radioCardsItemVariants> {
  className?: string;
}

const RadioCardsRoot = React.forwardRef<HTMLDivElement, RadioCardsRootProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <RadioGroupRoot
        {...props}
        ref={forwardedRef}
        className={cn(radioCardsRootVariants(), className)}
      />
    );
  }
);
RadioCardsRoot.displayName = 'RadioCards.Root';

const RadioCardsItem = React.forwardRef<HTMLDivElement, RadioCardsItemProps>(
  ({ className, variant, ...props }, forwardedRef) => {
    return (
      <RadioGroupItem
        {...props}
        ref={forwardedRef}
        className={cn(radioCardsItemVariants({ variant }), className)}
      />
    );
  }
);
RadioCardsItem.displayName = 'RadioCards.Item';

export { RadioCardsRoot, RadioCardsItem };
