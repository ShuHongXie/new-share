/*

import { useState, useEffect, useRef, useMemo } from "react";
import UseMemoCounts from "./use-memo-counts";

export default function ParentComponent() {
  const [times, setTimes] = useState(0);
  const useMemoRef = useRef(0);

  const incrementUseMemoRef = () => useMemoRef.current++;
  const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);

  return (
    <div className="flex flex-col justify-center items-center border-2 rounded-md mt-5 dark:border-yellow-200 max-w-lg m-auto pb-10 bg-gray-900">
      <div className="mt-4 text-center">
        <button
          className="bg-indigo-200 py-2 px-10 rounded-md"
          onClick={() => setTimes(times + 1)}
        >
          Force render
        </button>

        <UseMemoCounts memoizedValue={memoizedValue} />
      </div>
    </div>
  );
}

// components/use-memo-counts.js

function UseMemoCounts({memoizedValue}) {
  return (
    <div className="mt-3">
      <p className="dark:text-white max-w-md">
        I'll only re-render when you click <span className="font-bold text-indigo-400">Force render.</span> 
        </p>
      <p className="dark:text-white">I've now rendered: <span className="text-green-400">{memoizedValue} time(s)</span> </p>
    </div>
  );
}
export default UseMemoCounts;

 */
