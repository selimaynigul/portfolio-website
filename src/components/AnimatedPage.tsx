// AnimatedPage.tsx
import React from "react";
import { motion } from "framer-motion";

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} // start slightly below and transparent
    animate={{ opacity: 1, y: 0 }} // move to original position and fade in
    exit={{ opacity: 0, y: -10 }} // fade out moving slightly upwards
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
