import React from 'react';
import { TextPanel } from '../../TextPanel/TextPanel';

interface TextPanelsProps {
  onOriginalInputChange: (value: string) => void;
}

const TextPanels: React.FC<TextPanelsProps> = ({ onOriginalInputChange }) => {
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
