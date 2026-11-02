import { useState, useEffect, useRef } from "react";

function LifeCycleDemo({ parentCounter }) {
  const [childCounter, setChildCounter] = useState(0);
  // Previous value is kept in state (set in the click handler) because
  // refs must not be read during render
  const [previousCount, setPreviousCount] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const isFirstRender = useRef(true);
  const inputRef = useRef(null);
  const renderCountRef = useRef(null);
  const renderCount = useRef(0);

  // Ordering of useEffect hook matters. They will run in order, so the
  // update effects see isFirstRender before the mount effect clears it
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    console.log("Child Counter Update: ", childCounter);
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
      // StrictMode remounts once in development; reset so the update
      // effects skip that remount too
      isFirstRender.current = true;
    };
  }, []);

  // No dependency array: runs after every commit. The count is written
  // straight to the DOM so tracking it doesn't cause another render
  useEffect(() => {
    renderCount.current += 1;
    renderCountRef.current.textContent = renderCount.current;
  });

  function handleIncrement() {
    setPreviousCount(childCounter);
    setChildCounter(childCounter + 1);
  }

  return (
    <div className="stack child">
      <p>
        Child Counter : {childCounter} -- [Previous Value:{" "}
        {previousCount ?? "none"}]
      </p>
      <p>
        Total Renders: <span ref={renderCountRef} />
      </p>
      <button type="button" onClick={handleIncrement}>
        Increment Child Counter
      </button>
      <input
        type="text"
        aria-label="Focus me on mount"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Focus me on mount"
        ref={inputRef}
      />
    </div>
  );
}

export default LifeCycleDemo;
