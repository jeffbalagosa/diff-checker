import React from 'react';
import './App.css';
import { useState } from 'react';
import { Button } from './components/ui/button';
import TextPanels from './components/Containers/TextPanels/TextPanels';
import ResultsPanels from './components/Containers/ResultsPanels/ResultsPanels';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [originalTextInput, setOriginalTextInput] = useState('');

  const handleOriginalInputChange = (input: string) => {
    setOriginalTextInput(input);
  };

  const handleClick = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };

  return (
    <>
      <h1 className="text-orange-400 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-5">
        Simple Diff Checker
      </h1>
      <TextPanels onOriginalInputChange={handleOriginalInputChange} />
      <div className="flex justify-center mt-6">
        <Button
          className="bg-orange-400 text-black text-lg hover:bg-orange-500"
          onClick={handleClick}
        >
          Compare
        </Button>
      </div>
      <ResultsPanels originalTextInput={originalTextInput} />
    </>
  );
}

export default App;
