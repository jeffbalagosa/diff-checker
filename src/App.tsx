import React from 'react';
import './App.css';
import { TextPanel } from '@/components/TextPanel/TextPanel';

function App() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <TextPanel
          className="h-[50vh]"
          placeholder="Place original text here..."
        />
        <TextPanel
          className="h-[50vh]"
          placeholder="Place changed text here..."
        />
      </div>
    </>
  );
}

export default App;
