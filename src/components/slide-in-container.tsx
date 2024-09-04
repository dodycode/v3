import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface SlideInContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SlideInContainer: React.FC<SlideInContainerProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay: delay,
        },
      });
      setHasAnimated(true);
    }
  }, [controls, delay, hasAnimated, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};
