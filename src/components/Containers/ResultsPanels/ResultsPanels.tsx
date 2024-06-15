import React from 'react';

interface ResultsPanelsProps {
  originalTextInput: string;
  changedTextInput: string;
}

const ResultsPanels = ({
  originalTextInput,
  changedTextInput,
}: ResultsPanelsProps) => {
  return (
    <div className="flex justify-center mt-6 text-orange-400">
      <div>{originalTextInput}</div>
      <div>{changedTextInput}</div>
    </div>
  );
};

export default ResultsPanels;
