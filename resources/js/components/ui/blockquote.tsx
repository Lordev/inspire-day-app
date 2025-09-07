import React from 'react';

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  className?: string;
}

function Blockquote({ children, className = '', ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={`relative p-6  bg-gradient-to-r from-primary/10 to-secondary/50 text-muted-foreground font-medium ${className}`}
      {...props}
    >
      <p className="relative z-10">{children}</p>
    </blockquote>
  );
}

Blockquote.displayName = 'Blockquote';

export { Blockquote };
export type { BlockquoteProps };