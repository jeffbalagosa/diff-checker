import React from 'react';
import LineNumbers from '@/components/LineNumbers/LineNumbers';

interface ResultPanelProps {
  title: string;
  textInput: string;
  compareText: string;
  scrollTop: number;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const ResultPanel: React.FC<ResultPanelProps> = ({
  title,
  textInput,
  compareText,
  scrollTop,
  onScroll,
}) => {
  const splitTextInput = textInput.split('\n');
  const splitCompareText = compareText.split('\n');
  const lineCount = splitTextInput.length;

  const splitTextInputWithCompare = splitTextInput.map((line, index) => {
    const className =
      line !== splitCompareText[index]
        ? title === 'Changed Text:'
          ? 'bg-green-100'
          : 'bg-red-100'
        : '';
    return (
      <div key={index} className={className}>
        {line}
      </div>
    );
  });

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
          {splitTextInputWithCompare}
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
