"use client";
import React, { useRef, useState, useEffect } from "react";

// SPLIT + GSAP
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// MOTION
import { easeIn, motion } from "motion/react";
motion;

// VIDEOS (replace if needed)
import work1 from "../assets/Video/work1.webm";
import work2 from "../assets/Video/work2.webm";
import work3 from "../assets/Video/work3.webm";

// Images
import img1 from "../assets/Work/work1.webp";
import img2 from "../assets/Work/work2.webp";
import img3 from "../assets/Work/work3.webp";

function Project() {
  // refs for split text
  const workRefs = useRef([]);

  // refs for interactive cards
  const cardRefs = useRef([]);

  // single active hover state
  const [activeIndex, setActiveIndex] = useState(null);

  // mouse position relative to hovered card
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // ----------------------------------------------------
  // PROJECT ARRAY (4 PROJECTS + reversed layout)
  // ----------------------------------------------------
  const projects = [
    {
      id: 0,
      title: "Mediafly",
      role: "frontend",
      year: "2022",
      video: work1,
      Image: img1,
      link: "https://mediafly-three.vercel.app/",
    },
    {
      id: 1,
      title: "Foodora",
      role: "frontend",
      year: "2023",
      video: work2,
      Image: img2,
      link: "https://foodora-catter.vercel.app/",
    },
    {
      id: 2,
      title: "Chatsphere",
      role: "MERN",
      year: "2025",
      video: work3,
      Image: img3,
      link: "https://chatsphere-user.vercel.app/",
    },
    {
      id: 3,
      title: "Unknown",
      role: "MERN",
      year: "20..",
      link: "https://example.com/project4",
    },
  ];

  // ------------------------------
  // GSAP split text animation
  // ------------------------------
  useEffect(() => {
    const splits = [];
    workRefs.current.forEach((node) => {
      if (!node) return;
      const split = new SplitType(node, { types: "lines, words" });
      splits.push({ node, split });

      gsap.from(split.lines, {
        y: "100%",
        opacity: 0,
        ease: "back.out(1.7)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: node,
          start: "top 80%",
          end: "top 0%",
          scrub: true,
          markers: false,
        },
      });
    });

    return () => splits.forEach((s) => s.split.revert());
  }, []);

  // ------------------------------
  // HOVER HANDLERS
  // ------------------------------
  const handleMouseEnter = (index) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const handleMouseMove = (e, index) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  const openLink = (url) => window.open(url, "_blank");

  return (
    <div
      id="Project"
      className="min-h-screen w-full bg-[#161717] text-white pb-[30vw] lg:py-[5vw] px-[5vw]"
    >
      {/* TITLE AREA */}
      <div className="min-h-[40vh] lg:h-full pl-0 lg:pl-[8vw] relative flex items-center lg:overflow-hidden">
        {/* sm */}
        <h1
          ref={(el) => (workRefs.current[2] = el)}
          className="text-[20vw] font-[gilroy] leading-[16vw] lg:hidden"
        >
          Stunt
          <span className="ml-[30vw]">
            Wo<span className="font-[gilit] text-[#145ece]">r</span>
          </span>
          ks
        </h1>

        {/* lg */}
        <h1
          ref={(el) => (workRefs.current[0] = el)}
          className="text-[10vw] font-[gilroy] hidden lg:block"
        >
          Stunt Wo<span className="font-[gilit] text-[#145ece]">r</span>ks
        </h1>

        <span
          ref={(el) => (workRefs.current[1] = el)}
          className="font-[gilsem] text-[1.2vw] ml-[1vw] mt-[5vw] hidden lg:block"
        >
          (04)
        </span>

        {/* SVGs (unchanged) */}
        <svg
          className="stroke-white rotate-45 absolute bottom-[5%] left-[10%] lg:hidden"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M3.10162 3.10156L62.9999 62.9999" />
          <path d="M63 1.00001L63 63L0.999989 63" />
        </svg>

        <svg
          className="stroke-white rotate-90 absolute top-[40%] right-[10%] hidden lg:block"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M3.10162 3.10156L62.9999 62.9999" />
          <path d="M63 1.00001L63 63L0.999989 63" />
        </svg>
      </div>

      {/* PROJECTS */}
      <div className="corner flex flex-col lg:flex-row gap-[6vw] items-end mt-[8vw] flex-wrap">
        {projects.map((p, index) => {
          const isPrimary = index === 0 || index === 2;

          const cardClass = isPrimary
            ? "work1 h-[50vh] lg:h-[80vh] w-full lg:w-[55%]"
            : "work2 h-[50vh] w-full lg:h-[55vh] lg:w-[32%]";

          return (
            <div
              key={p.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() => openLink(p.link)}
              className={`${cardClass} bg-[url(${p.Image})] bg-black rounded-[10vw] lg:rounded-[2.5vw] relative cursor-pointer`}
              style={{
                backgroundImage: `url(${p.Image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* YEAR + ROLE */}
              <div className="role">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : -20,
                    display: activeIndex === index ? "block" : "none",
                  }}
                  transition={{ duration: 0.45, ease: "backInOut" }}
                  className="bg-white text-black rounded-2xl lg:rounded-[2.5vw] px-[4vw] py-[2vw] lg:px-[2vw] lg:py-[.7vw] absolute bottom-[34vw] left-[5vw] lg:bottom-[10vw] lg:left-[1.5vw]"
                >
                  <p className="text-[3vw] lg:text-[.8vw] font-[gilsem] uppercase">
                    year: {p.year}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : -20,
                    display: activeIndex === index ? "block" : "none",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15,
                    ease: "backInOut",
                  }}
                  className="bg-white text-black rounded-2xl lg:rounded-[2.5vw] px-[4vw] py-[2vw] lg:px-[2vw] lg:py-[.7vw] absolute bottom-[24vw] left-[5vw] lg:bottom-[7vw] lg:left-[1.5vw]"
                >
                  <p className="text-[3vw] lg:text-[.8vw] font-[gilsem] uppercase">
                    role: {p.role}
                  </p>
                </motion.div>
              </div>

              {/* TITLE + ARROW */}
              <div className="info flex items-center lg:items-start gap-[1vw] absolute bottom-[5vw] left-[4vw] lg:bottom-[1.2vw] lg:left-[1vw]">
                <div className="capsule h-[8vh] w-[40vw] lg:h-[9vh] lg:w-[15vw] bg-white text-black rounded-[12vw] flex items-center justify-center text-lg lg:text-2xl font-[gilsem] lg:rounded-[2.5vw]">
                  {p.title}
                </div>
                <div className="h-[7vh] w-[7vh] lg:h-[9vh] lg:w-[9vh] rounded-full bg-white flex items-center justify-center">
                  <svg className="arrow h-5 lg:h-7" viewBox="0 0 9.56 9.56">
                    <line
                      x1="0.27"
                      y1="9.29"
                      x2="9.18"
                      y2="0.38"
                      stroke="#4e4e4e"
                      strokeWidth="0.75"
                    />
                    <polyline
                      points="5.01 0.38 9.18 0.38 9.18 4.55"
                      fill="none"
                      stroke="#4e4e4e"
                      strokeLinecap="round"
                      strokeWidth="0.75"
                    />
                  </svg>
                </div>
              </div>

              {/* MOUSE PREVIEW */}
              <motion.div
                style={{
                  left: `${position.x - (isPrimary ? 240 : 75)}px`,
                  top: `${position.y - 15}px`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === index ? 1 : 0 }}
                transition={{ duration: 0.25, ease: easeIn }}
                className="holder w-full m-auto hidden lg:block"
              >
                <div
                  className={`mouse w-full flex gap-[.5vw] ${
                    isPrimary ? "ml-[13.5vw]" : "ml-[3.5vw]"
                  } mb-[1vw]`}
                >
                  <div className="h-[4vh] w-[3.5vh] border-2 border-white rounded-full"></div>
                  <div className="bg-white rounded-[2.5vw] px-[2vw] py-[.5vw] inline-block">
                    <p className="font-[gilroy] text-[.8vw] uppercase text-black">
                      NEXT JS
                    </p>
                  </div>
                </div>

                <div
                  className={`showcase ${
                    isPrimary ? "h-[28vh] w-[45%]" : "h-[28vh] w-[75%]"
                  } bg-[#ffffff83] rounded-[.5vw] px-[.1vw] pb-[.1vw] m-auto`}
                >
                  <div className="dot flex gap-[.1vw] py-[.5vw] px-[.5vw]">
                    <span className="h-[.5vw] w-[.5vw] rounded-full bg-white"></span>
                    <span className="h-[.5vw] w-[.5vw] rounded-full bg-white"></span>
                    <span className="h-[.5vw] w-[.5vw] rounded-full bg-white"></span>
                  </div>

                  <div className="view h-[25.2vh] w-full bg-[#ffffffa6] rounded-[.2vw] overflow-hidden">
                    <video
                      autoPlay
                      muted
                      loop
                      className="h-full w-full object-cover"
                      src={p.video}
                    ></video>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Project;
