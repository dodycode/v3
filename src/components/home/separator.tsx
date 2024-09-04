import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { HoverBorderGradient } from "./hover-gradient-button";

interface SeparatorProps {
  text: string;
  href?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ text, href = "#" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start({ opacity: 1 });
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, controls]);

  return (
    <motion.div
      ref={ref}
      className="relative my-32"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full pl-5 overflow-x-hidden md:pl-0">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent to-white md:from-white dark:from-transparent dark:to-neutral-950 md:dark:from-neutral-950 md:via-transparent md:dark:via-transparent md:to-white md:dark:to-neutral-950" />
        <div className="w-full h-px border-t border-dashed border-neutral-300 dark:border-neutral-600" />
      </div>
      <a
        href={href}
        className="absolute md:-translate-x-1/2 -translate-y-1/2 md:left-1/2 left-0 md:ml-0 ml-5"
      >
        <HoverBorderGradient
          containerClassName="uppercase tracking-widest text-[0.6rem] rounded-full border-neutral-100 dark:border-neutral-800"
          className="flex items-center justify-center w-auto h-auto px-3 py-1.5 bg-white dark:bg-neutral-900 text-neutral-400"
          as="span"
        >
          <p className="leading-none">{text}</p>
          <div className="flex items-center justify-center w-5 h-5 translate-x-1 border rounded-full border-neutral-100 dark:border-neutral-800">
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
              />
            </svg>
          </div>
        </HoverBorderGradient>
      </a>
    </motion.div>
  );
};
