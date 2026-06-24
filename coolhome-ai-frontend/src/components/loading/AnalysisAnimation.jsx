import { motion } from "framer-motion";

export default function AnalysisAnimation() {
  return (
    <div className="flex justify-center mb-12">

      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="
        h-24
        w-24
        border-4
        border-blue-500
        border-t-transparent
        rounded-full
        "
      />

    </div>
  );
}