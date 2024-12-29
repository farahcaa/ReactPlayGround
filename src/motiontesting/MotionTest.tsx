import * as motion from "motion/react-client";
import { useState } from "react";

const variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};
const MotionTest = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <motion.div
        initial={variants.initial}
        animate={clicked ? variants.animate : variants.initial}
        className="p-10 bg-blue-500 text-white"
      >
        im a div
      </motion.div>
      <button
        title="click me"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => setClicked(!clicked)}
      />
    </div>
  );
};

export default MotionTest;
