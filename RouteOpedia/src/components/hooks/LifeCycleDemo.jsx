import { useState } from "react";

function LifeCycleDemo() {
  const [childCounter, setChildCounter] = useState(0);
  return (
    <div>
      <p>Child Counter : {childCounter}</p>
      <button onClick={() => setChildCounter((o) => o + 1)}>
        Increment Child Counter
      </button>
    </div>
  );
}

export default LifeCycleDemo;
