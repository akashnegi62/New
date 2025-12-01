import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// components
import Home from "./Components/Home";
import Header from "./Components/Header";
import Project from "./Components/Project";
import Contact from "./Components/Contact";
import Loader from "./Components/Loader";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  return (
    <div className="App">
      <div className="main min-h-screen w-full overflow-hidden">
        <Loader />
        <Header />
        <Home />
        <Project />
        <Contact />
      </div>
    </div>
  );
}

export default App;
