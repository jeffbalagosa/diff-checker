import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextPanel = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const [lineCount, setLineCount] = React.useState(1);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      const lineNumbers = e.currentTarget.parentElement?.querySelector(".line-numbers");
      if (lineNumbers) {
        lineNumbers.scrollTop = e.currentTarget.scrollTop;
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lineNumbers = e.currentTarget.value.split("\n").length;
      setLineCount(lineNumbers);
    };

    return (
      <div className="relative w-full">
        <div
          className="absolute top-0 left-0 w-10 h-full border-r border-input bg-background text-sm text-muted-foreground flex flex-col items-center"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <span key={i} className="leading-6 px-1 select-none">
              {i + 1}
            </span>
          ))}
        </div>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full pl-12 pr-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={textareaRef}
          onScroll={handleScroll}
          onInput={handleInput}
          {...props}
        />
      </div>
    );
  }
);

TextPanel.displayName = "Textarea";

export { TextPanel };
