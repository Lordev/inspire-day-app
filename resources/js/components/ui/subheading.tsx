import * as React from 'react';
import { cn } from '@/lib/utils';

interface SubHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
  className?: string;
}

const SubHeading = React.forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'h6';
    return (
      <Comp
        ref={ref}
        className={cn('text-sm font-medium text-slate-500', className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SubHeading.displayName = 'SubHeading';

export { SubHeading };
export type { SubHeadingProps };
