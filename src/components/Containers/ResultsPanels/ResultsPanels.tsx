import React from 'react';

interface ResultsPanelsProps {
  originalTextInput: string;
}

const ResultsPanels = ({ originalTextInput }: ResultsPanelsProps) => {
  return (
    <div className="flex justify-center mt-6 text-orange-400">
      <div>{originalTextInput}</div>
      <div>Test 2</div>
    </div>
  );
};

export default ResultsPanels;
