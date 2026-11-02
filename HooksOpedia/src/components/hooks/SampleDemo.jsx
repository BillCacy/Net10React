import { useState } from "react";
import LifeCycleDemo from "./LifeCycleDemo";

function SampleDemo() {
  const [counter, setCounter] = useState(0);
  const [showComponent, setShowComponent] = useState(false);

  return (
    <section className="stack">
      <h2>React Hooks</h2>

      <button type="button" onClick={() => setShowComponent((o) => !o)}>
        {showComponent ? "Unmount Component" : "Mount Component"}
      </button>
      <p>Parent Counter : {counter}</p>
      <button type="button" onClick={() => setCounter((o) => o + 1)}>
        Increment Parent Counter
      </button>

      {showComponent && <LifeCycleDemo parentCounter={counter} />}
    </section>
  );
}

export default SampleDemo;
