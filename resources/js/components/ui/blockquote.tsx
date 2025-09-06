import React from 'react';

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  className?: string;
}

function Blockquote({ children, className = '', ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={`relative p-6 rounded-lg bg-muted text-zinc-800 text-lg font-light  ${className}`}
      {...props}
    >
      <p className="relative z-10">{children}</p>
    </blockquote>
  );
}

Blockquote.displayName = 'Blockquote';

export { Blockquote };
export type { BlockquoteProps };