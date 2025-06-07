"use client";

import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";

const GoToTop = () => {

const [display, setDisplay] = useState('hidden');
const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    setDisplay(scrollPosition > 0 ? '' : 'hidden');
  }, [scrollPosition]);

  return (
    <div className={`fixed right-[1vw] bottom-[5vh] ${display}`}>
      <GoArrowUp
        color="white"
        className="w-[50px] h-auto bg-[#1976d2] rounded-full p-1 opacity-50
        hover:opacity-100 hover:scale-110 hover:cursor-pointer transition-all"
        onClick={scrollToTop}
      >
        Go to Top
      </GoArrowUp>
    </div>
  );
};

export default GoToTop;
