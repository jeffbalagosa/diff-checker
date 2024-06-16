import React, { useRef, useEffect } from 'react';

interface LineNumbersProps {
  lineCount: number;
  scrollTop: number;
}

const LineNumbers: React.FC<LineNumbersProps> = ({ lineCount, scrollTop }) => {
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div
      ref={lineNumbersRef}
      className="absolute top-0 left-0 w-12 h-full border-r border-input bg-background bg-slate-600 text-lg text-muted-foreground flex flex-col items-center overflow-hidden text-white"
      style={{
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        lineHeight: '1.5rem',
      }}
    >
      {Array.from({ length: lineCount }).map((_, i) => (
        <span
          key={i}
          className="select-none text-right w-full px-1"
          style={{ height: '1.5rem' }}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
};

export default LineNumbers;
