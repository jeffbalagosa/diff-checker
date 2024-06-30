import React, { useState } from 'react';
import ResultPanel from '@/components/ResultPanel/ResultPanel';

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

  const handleOriginalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setOriginalScrollTop(e.currentTarget.scrollTop);
  };

  const handleChangedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setChangedScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <ResultPanel
        title="Original Text:"
        textInput={originalTextInput}
        compareText={changedTextInput}
        scrollTop={originalScrollTop}
        onScroll={handleOriginalScroll}
      />
      <ResultPanel
        title="Changed Text:"
        textInput={changedTextInput}
        scrollTop={changedScrollTop}
        compareText={originalTextInput}
        onScroll={handleChangedScroll}
      />
    </div>
  );
};

export default ResultsPanels;
