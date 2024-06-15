import React from 'react';
import { TextPanel } from '../../TextPanel/TextPanel';

interface TextPanelsProps {
  onOriginalInputChange: (value: string) => void;
  onChangedInputChange: (value: string) => void;
}

const TextPanels: React.FC<TextPanelsProps> = ({ onOriginalInputChange, onChangedInputChange }) => {
  const handleOriginalInputChange = (value: string) => {
    onOriginalInputChange(value);
  };

  const handleChangedInputChange = (value: string) => {
    onChangedInputChange(value);
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <TextPanel
        onInputChange={handleOriginalInputChange}
        className="h-[50vh]"
        placeholder="Place original text here..."
      />
      <TextPanel
        onInputChange={handleChangedInputChange}
        className="h-[50vh]"
        placeholder="Place changed text here..."
      />
    </div>
  );
};

export default TextPanels;
