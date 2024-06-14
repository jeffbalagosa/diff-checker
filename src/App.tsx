import React from 'react';
import './App.css';
import { TextPanel } from "@/components/TextPanel/TextPanel";

function App() {
  return (
    <>
      <style>
        {`
          .textPanelImportantStyle {
            height: 50vh !important;
          }
        `}
      </style>
      <TextPanel className="textPanelImportantStyle" />
    </>
  );
}

export default App;
