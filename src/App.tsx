import React from 'react';
import './App.css';
import { Button } from './components/ui/button';
import TextPanels from './components/Containers/TextPanels/TextPanels';

function App() {
  return (
    <>
      <h1 className="text-orange-400 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-5">
        Simple Diff Checker
      </h1>
      <TextPanels />
      <div className="flex justify-center mt-6">
        <Button className="bg-orange-400 text-black text-lg hover:bg-orange-500">
          Compare
        </Button>
      </div>
    </>
  );
}

export default App;
