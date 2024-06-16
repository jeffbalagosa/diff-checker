import React from 'react';
import LineNumbers from '@/components/LineNumbers/LineNumbers';

interface ResultPanelProps {
  title: string;
  textInput: string;
  scrollTop: number;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const ResultPanel: React.FC<ResultPanelProps> = ({
  title,
  textInput,
  scrollTop,
  onScroll,
}) => {
  const lineCount = textInput.split('\n').length;

  return (
    <div>
      <h2 className="font-bold mb-4 text-orange-400 bg-black text-2xl">
        {title}
      </h2>
      <div className="relative border bg-gray-100 overflow-hidden">
        <LineNumbers lineCount={lineCount} scrollTop={scrollTop} />
        <div
          className="relative overflow-auto pl-12 p-2 text-lg"
          style={{
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            lineHeight: '1.5rem',
          }}
          onScroll={onScroll}
        >
          {textInput}
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
