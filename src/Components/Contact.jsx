import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
motion;
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Images
import Linkedin from "../assets/Image/linkedin.svg";
import Github from "../assets/Image/github.svg";
import Whatsapp from "../assets/Image/whatsapp.svg";
import Resume from "../assets/Resume/Resume.pdf";
function Contact() {
  const circleref = useRef(null);
  const [data, setdata] = useState([
    {
      name: "Linkdin",
      img: Linkedin,
      username: "@akashnegi7142",
      link: "https://www.linkedin.com/in/akash-negi-aa66a334b",
    },
    {
      name: "Github",
      img: Github,
      username: "@akashnegi62",
      link: "https://github.com/akashnegi62",
    },
    {
      name: "Whatsapp",
      img: Whatsapp,
      username: "+918447326572",
      link: "https://wa.me/+918447326572",
    },
  ]);
  setdata;
  // animation
  const isInView = useInView(circleref, {
    margin: "50px 0px 50px 0px",
  });

  // variants

  const CircleVariant = {
    visible: { y: "-10%" },
    hidden: { y: "-100%" },
  };

  //

  const textRef = useRef(null);
  useEffect(() => {
    const splitText = new SplitType(textRef.current, {
      types: "words, chars",
    });

    gsap.from(splitText.words, {
      opacity: 0,
      x: 50,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: "top 0%",
        scrub: true,
        markers: false,
      },
    });
    return () => {
      splitText.revert();
    };
  }, []);

  // HANDLE EMAIL
  const handleMailClick = () => {
    const recipient = "akashnegi7142@gmail.com"; // Replace with the email you want to send to
    const subject = "Hello from React";
    const body = "This is a message sent from the React app!";

    // Construct the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the user's default email client
    window.location.href = mailtoLink;
  };

  // HANDLE DOWNLOAD
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = Resume;
    link.download = "Resume.pdf";
    link.click();
  };

  // Open Link
  const openLink = () => {
    // Open the link in a new tab
    window.open("https://portfolio-your.vercel.app/", "_blank");
  };

  return (
    <div
      id="Contact"
      className="h-[150vh] lg:h-[120vh] w-full bg-[#145ece] pt-[30vw] lg:py-[10vw] px-[5vw] relative overflow-hidden"
    >
      <h1 className="text-[20vw] font-[gilsem] leading-none text-center text-white lg:hidden">
        Let's <br /> Connect
      </h1>
      <h1
        ref={textRef}
        className="text-[5.5vw] font-[gilsem] leading-none text-center uppercase text-white hidden lg:block"
      >
        Let's Talk <br />
        About the Next <br />
        big thing
      </h1>

      <div className="min-h-[20vh] lg:h-[15vh] w-full flex flex-col lg:flex-row gap-[5vw] lg:gap-0 items-center mt-[10vw] lg:mt-[5vw] px-[2vw] lg:px-0 text-white">
        <button
          onClick={() => handleMailClick()}
          className="relative overflow-hidden w-full bg-white lg:bg-[#fff0] text-black lg:text-white lg:w-[50%] border border-white py-[5vw] lg:py-[2.5vw] mr-[2vw] rounded-full text-xl lg:text-[1.5vw] font-[gilroy] hover:text-black z-12 before:absolute before:h-[12.6vh] before:w-full before:bg-white before:top-full before:left-0 before:z-[-1] hover:before:top-[0%] before:transition-all before:duration-300 before:ease-in-out"
        >
          Write A Message
        </button>
        <button
          onClick={() => handleDownload()}
          className="relative overflow-hidden w-full bg-white lg:bg-[#fff0] text-black lg:text-white lg:w-[50%] border border-white py-[5vw] lg:py-[2.5vw] mr-[2vw] rounded-full text-xl lg:text-[1.5vw] font-[gilroy] hover:text-black z-12 before:absolute before:h-[12.6vh] before:w-full before:bg-white before:top-full before:left-0 before:z-[-1] hover:before:top-[0%] before:transition-all before:duration-300 before:ease-in-out"
        >
          Resume
        </button>
      </div>
      {/* //svg */}
      <div className="svg z-5 hidden lg:block">
        <motion.svg
          variants={CircleVariant}
          ref={circleref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden]"}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="c-circle"
          viewBox="0 0 1254 1254"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <circle
            cx="627"
            cy="627"
            r="627"
            fill="url(#paint0_radial_3260_3)"
          ></circle>{" "}
          <defs>
            {" "}
            <radialGradient
              id="paint0_radial_3260_3"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(627) rotate(90) scale(813)"
            >
              {" "}
              <stop stopColor="#F3F3F3" stopOpacity="0.45"></stop>{" "}
              <stop offset="1" stopColor="white" stopOpacity="0"></stop>{" "}
            </radialGradient>{" "}
          </defs>{" "}
        </motion.svg>
      </div>

      {/* //sm */}
      <div className="min-h-[30vh] w-full absolute left-0 bottom-[30vh] z-10 px-[6vw]">
        <div className="min-h-[30vh] w-full flex flex-col justify-center gap-[4vw] text-white lg:hidden relative">
          {data.map((items, index) => (
            <a key={index} href={items.link} target="_blank">
              <div className="shaders h-[10vh] w-full px-[8vw] flex justify-between items-center border-t border-white">
                <div className="app_text font-[gilroy] absolute left-0">
                  <h1 className="text-2xl ">{items.name}</h1>
                  <p className="shaders_p  text-[#a6b0ae]">{items.username}</p>
                </div>
                <div className="app_img h-[5vh] w-[5vh] rounded-full bg-white flex justify-center items-center absolute right-0">
                  <img className="h-7" src={items.img} alt="" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* //lg */}

      <div className="hidden lg:block">
        <div className="h-[15vh] w-full flex justify-center gap-[4vw] absolute left-0 bottom-[20vh] z-10 text-white">
          {data.map((items, index) => (
            <a key={index} href={items.link} target="_blank">
              <div className="shaders h-[8vh] w-[20vw] py-0 flex justify-between items-center border-t border-white hover:px-2 hover:text-[#145ece] hover:transition-all hover:duration-300 hover:ease-in-out">
                <div className="app_text font-[gilroy]">
                  <h1 className="text-[1.5vw]">{items.name}</h1>
                  <p className="shaders_p text-[.8vw] text-[#a6b0ae]">
                    {items.username}
                  </p>
                </div>
                <div className="app_img h-[5vh] w-[5vh] rounded-full bg-white flex justify-center items-center">
                  <img className="h-7" src={items.img} alt="" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* // */}
      <div
        id="footer"
        className="footer h-[10vh] w-full flex flex-col lg:flex-row justify-center gap-[2vw] lg:gap-0 lg:justify-between px-[4vw] absolute left-[1.5vh] lg:left-0 bottom-[10vh] lg:bottom-0 z-10"
      >
        <p className="tetxt-2xl lg:text-[.8vw] font-[gilroy] hover:text-white transition-all duration-300 ease-in-out text-[#a6b0ae]">
          © 2025 Akash Negi, &nbsp; All rights reserved.
        </p>
        <p
          onClick={() => openLink()}
          className="tetxt-2xl lg:text-[.8vw] font-[gilroy] text-[#a6b0ae] hover:text-white transition-all duration-300 ease-in-out underline underline-offset-4"
        >
          2024 PORTFOLIO
        </p>
      </div>
    </div>
  );
}

export default Contact;
