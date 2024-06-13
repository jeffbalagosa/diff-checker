import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextPanel = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const [lineCount, setLineCount] = React.useState(1);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lineNumbers = e.currentTarget.value.split("\n").length;
      setLineCount(lineNumbers);
    };

    return (
      <div className="relative w-full flex">
        <div
          ref={lineNumbersRef}
          className="absolute top-0 left-0 w-10 h-full border-r border-input bg-background text-sm text-muted-foreground flex flex-col items-center overflow-hidden"
          style={{ lineHeight: "1.5", paddingTop: "2px" }}
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <span key={i} className="leading-5 select-none text-right w-full px-1">
              {i + 1}
            </span>
          ))}
        </div>
        <textarea
          className={cn(
            "flex-1 min-h-[80px] w-full pl-14 pr-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={textareaRef}
          onScroll={handleScroll}
          onInput={handleInput}
          {...props}
          style={{ lineHeight: "1.5" }}
        />
      </div>
    );
  }
);

TextPanel.displayName = "TextPanel";

export { TextPanel };
