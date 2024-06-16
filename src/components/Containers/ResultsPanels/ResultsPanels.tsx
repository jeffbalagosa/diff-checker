import React, { useState } from 'react';
import LineNumbers from '@/components/LineNumbers/LineNumbers';

interface ResultsPanelsProps {
  originalTextInput: string;
  changedTextInput: string;
}

const ResultsPanels: React.FC<ResultsPanelsProps> = ({
  originalTextInput,
  changedTextInput,
}) => {
  const [originalScrollTop, setOriginalScrollTop] = useState(0);
  const [changedScrollTop, setChangedScrollTop] = useState(0);

  const originalLineCount = originalTextInput.split('\n').length;
  const changedLineCount = changedTextInput.split('\n').length;

  const handleOriginalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setOriginalScrollTop(e.currentTarget.scrollTop);
  };

  const handleChangedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setChangedScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-5 relative">
      <div>
        <h2 className="font-bold mb-2 text-orange-400 bg-black">
          Original Text:
        </h2>
        <div className="border p-3 bg-gray-100 relative overflow-hidden">
          <LineNumbers
            lineCount={originalLineCount}
            scrollTop={originalScrollTop}
          />
          <div
            className="relative overflow-auto pl-12"
            style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}
            onScroll={handleOriginalScroll}
          >
            {originalTextInput}
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-2 text-orange-400 bg-black">
          Changed Text:
        </h2>
        <div className="border p-3 bg-gray-100 relative overflow-hidden">
          <LineNumbers
            lineCount={changedLineCount}
            scrollTop={changedScrollTop}
          />
          <div
            className="relative overflow-auto pl-12"
            style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}
            onScroll={handleChangedScroll}
          >
            {changedTextInput}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanels;
