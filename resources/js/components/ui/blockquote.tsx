import React from 'react';

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  className?: string;
}

function Blockquote({ children, className = '', ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={`italic text-muted-foreground bg-zinc-100 p-8 border-l-0 ${className}`}
      {...props}
    >
      {children}
    </blockquote>
  );
}

Blockquote.displayName = 'Blockquote';

export { Blockquote };
export type { BlockquoteProps };