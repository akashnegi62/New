import { useState, useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import About from "../Components/About.jsx";
import { motion } from "motion/react";
motion;

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const textRefs = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  const gmtOffset = "GMT (+5:30)";

  useEffect(() => {
    textRefs.current.forEach((textRef) => {
      if (!textRef) return;
      const splitText = new SplitType(textRef, { types: "words" });
      gsap.from(splitText.words, {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 2,
      });
      return () => splitText.revert();
    });
  }, []);

  const slideRightToLeft = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 2 },
    },
  };

  return (
    <>
      <div
        className="home w-full h-[90vh] lg:min-h-screen bg-[#161717] text-white pt-28 pl-10 lg:px-[5vw] relative overflow-hidden"
        id="Home"
      >
        {/* Mobile */}
        <h1
          ref={(el) => (textRefs.current[0] = el)}
          className="hero-text text-[20vw] leading-[20vw] font-[gilsem] overflow-hidden lg:hidden"
        >
          Creative
        </h1>

        <motion.h1
          variants={slideRightToLeft}
          initial="hidden"
          animate="visible"
          className="hero-text text-[20vw] text-[#145fcf] font-[gilit] ml-[12vw] lg:hidden"
        >
          -Superior
        </motion.h1>

        <h1
          ref={(el) => (textRefs.current[1] = el)}
          className="hero-text text-[20vw] leading-[20vw] font-[gilsem] overflow-hidden lg:hidden"
        >
          Designer
        </h1>

        {/* Desktop */}
        <h1
          ref={(el) => (textRefs.current[2] = el)}
          className="hidden lg:block hero-text text-[12vw] font-[gilsem] overflow-hidden"
        >
          Creative
        </h1>

        <motion.h1
          variants={slideRightToLeft}
          initial="hidden"
          animate="visible"
          className="hidden lg:block hero-text text-[10vw] text-[#145fcf] font-[gilit] absolute top-[25vh] right-[9vw]"
        >
          -Superior
        </motion.h1>

        <h1
          ref={(el) => (textRefs.current[3] = el)}
          className="hidden lg:block hero-text text-[15vw] leading-[15vw] ml-[15vw] font-[gilsem] overflow-hidden"
        >
          Developer
        </h1>

        <div className="h-[14vh] w-full flex items-center justify-between absolute bottom-0 left-0 px-4 lg:px-[5vw]">
          <div className="flex ml-8 gap-10 lg:gap-[4vw]">
            <h1 className="text-[3vw] lg:text-[.8vw] uppercase text-[#a2a2a3] font-[gilroy]">
              currently available <br /> for freelance
            </h1>
            <h1 className="text-[3vw] lg:text-[.8vw] uppercase text-[#a2a2a3] font-[gilroy]">
              My local Time {formattedTime} <br />
              {gmtOffset}
            </h1>
          </div>

          <div className="hidden lg:block mb-8">
            <a href="#About">
              <motion.svg
                whileHover={{
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 8,
                  },
                }}
                width="100"
                height="90"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle cx="100" cy="100" r="95" fill="white" />

                <line
                  x1="100"
                  y1="55"
                  x2="100"
                  y2="155"
                  stroke="black"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M70 125 L100 155 L130 125"
                  stroke="black"
                  stroke-width="5"
                  stroke-linecap="round"
                  fill="none"
                />
              </motion.svg>
            </a>
          </div>
        </div>
      </div>

      <About />
    </>
  );
}

export default Home;
