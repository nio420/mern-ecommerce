// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Starts 50px lower and invisible
      whileInView={{ opacity: 1, y: 0 }} // Animates to normal position when visible
      viewport={{ once: true, amount: 0.2 }} // Only animates once, when 20% visible
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;