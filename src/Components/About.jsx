import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "../Ui/Stack";

gsap.registerPlugin(ScrollTrigger);

import profile from "../assets/Image/profile.webp";
function About() {
  const textRefLg = useRef(null);
  const textRefSm = useRef(null);

  const animateSplitText = (ref, animationProps, triggerStart, triggerEnd) => {
    const split = new SplitType(ref.current, { types: "lines, words" });
    gsap.from(split.words, {
      ...animationProps,
      scrollTrigger: {
        trigger: ref.current,
        start: triggerStart,
        end: triggerEnd,
        scrub: true,
      },
    });
    return () => split.revert();
  };

  useEffect(() => {
    if (textRefLg.current) {
      animateSplitText(
        textRefLg,
        { opacity: 0, x: 50, duration: 1, stagger: 0.1, ease: "power4.out" },
        "top 80%",
        "top 20%"
      );
    }
  }, []);

  useEffect(() => {
    if (textRefSm.current) {
      animateSplitText(
        textRefSm,
        { opacity: 0, y: 40, duration: 1, stagger: 0.1, ease: "power4.out" },
        "top 85%",
        "top 30%"
      );
    }
  }, []);

  return (
    <div
      id="About"
      className="w-full bg-[#161717] min-h-screen px-[5vw] py-[15vw] lg:py-[8vw] text-white flex flex-col justify-center items-center"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[5vw] min-h-[50vh]">
        {/* Profile Image */}
        <div className="w-[65vw] h-[70vw] lg:w-[19vw] lg:h-[22vw] rounded-2xl bg-gray-200 overflow-hidden shadow-lg flex items-center justify-center">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile Text */}
        <h1
          ref={textRefSm}
          className="font-[gilroy] text-5xl sm:text-3xl uppercase text-center lg:hidden leading-snug mt-8 lg:mt-0"
        >
          MERN stack developer <br />
          <span className="text-[#145ece] font-[gilit] uppercase">
            passionate
          </span>{" "}
          about crafting <br /> responsive, high-perfor <br /> -mance web apps.
        </h1>

        {/* Desktop Text */}
        <h1
          ref={textRefLg}
          className="hidden lg:block font-[gilroy] text-[3vw] leading-[3.5vw] uppercase"
        >
          MERN stack developer <br />
          <span className="text-[#145ece] text-[3.2vw] font-[gilit] uppercase">
            passionate
          </span>{" "}
          about crafting <br /> responsive, high-perfor <br /> -mance web apps.
        </h1>
      </div>

      {/* Skill Stack */}
      <Stack />
    </div>
  );
}

export default About;
