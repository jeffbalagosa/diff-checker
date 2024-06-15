import React from 'react';
import { TextPanel } from '../../TextPanel/TextPanel';

const TextPanels = ({
  onOriginalInputChange,
}: {
  onOriginalInputChange: (value: string) => void;
}) => {
  const handleInputChange = (value: string) => {
    onOriginalInputChange(value);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <TextPanel
        onInputChange={handleInputChange}
        className="h-[50vh]"
        placeholder="Place original text here..."
      />
      <TextPanel
        className="h-[50vh]"
        placeholder="Place changed text here..."
      />
    </div>
  );
};

export default TextPanels;
