import * as React from "react";
import { cn } from "@/lib/utils";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={cn("relative", className)}>
                <textarea
                    ref={ref}
                    className={cn(
                        "w-full h-32 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    {...props}
                />
            </div>
        );
    }
);

TextArea.displayName = "TextArea";

export { TextArea };