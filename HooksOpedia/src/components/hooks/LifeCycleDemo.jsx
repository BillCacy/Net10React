import { useState, useEffect, useRef } from "react";

function LifeCycleDemo({ parentCounter }) {
  const [childCounter, setChildCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const isFirstRender = useRef(true);
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const previousCount = useRef();

  // Ordering of useEffect hook matters. They will run in order
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    console.log("Child Counter Update: ", childCounter);
    previousCount.current = childCounter;
  }, [childCounter]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    console.log("Parent Counter Update: ", parentCounter);
  }, [parentCounter]);

  useEffect(() => {
    console.log("Component Mounted");
    isFirstRender.current = false;
    inputRef.current?.focus();
    // Cleanup function to be called when the component is unmounted
    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <p>
        Child Counter : {childCounter} -- [Previous Value:{" "}
        {previousCount.current}]
      </p>
      <p>Total Renders: {renderCount.current}</p>
      <button onClick={() => setChildCounter((o) => o + 1)}>
        Increment Child Counter
      </button>
      <br />
      <br />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Focus me on mount"
        ref={inputRef}
      />
    </div>
  );
}

export default LifeCycleDemo;
