import * as React from 'react';
import { cn } from '@/lib/utils';
import LineNumbers from '../LineNumbers/LineNumbers';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onInputChange?: (value: string) => void;
}

const TextPanel = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const [lineCount, setLineCount] = React.useState(1);
    const [scrollTop, setScrollTop] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lineNumbers = e.currentTarget.value.split('\n').length;
      setLineCount(lineNumbers);
      props.onInputChange?.(e.currentTarget.value);
    };

    return (
      <div className="relative w-full flex">
        <LineNumbers lineCount={lineCount} scrollTop={scrollTop} />
        <textarea
          className={cn(
            'flex-1 min-h-[80px] w-full pl-14 pr-3 py-2 rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-lg',
            className
          )}
          ref={textareaRef}
          onScroll={handleScroll}
          onInput={handleInput}
          {...props}
          style={{ lineHeight: '1.5rem' }}
        />
      </div>
    );
  }
);

TextPanel.displayName = 'TextPanel';

export { TextPanel };
