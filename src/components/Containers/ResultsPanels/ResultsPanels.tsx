import React from "react";
import { cn } from "@/lib/utils";

interface ResultsPanelsProps {
  originalTextInput: string;
  changedTextInput: string;
}

const ResultsPanels = ({
  originalTextInput,
  changedTextInput,
}: ResultsPanelsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div
        className={cn(
          "flex-1 min-h-[80px] w-full pl-14 pr-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-lg"
        )}
      >
        {originalTextInput}
      </div>
      <div
        className={cn(
          "flex-1 min-h-[80px] w-full pl-14 pr-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-lg"
        )}
      >
        {changedTextInput}
      </div>
    </div>
  );
};

export default ResultsPanels;
