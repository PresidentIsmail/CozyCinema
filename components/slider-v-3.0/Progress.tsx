import { motion } from "framer-motion";

type Props = {
  curIndex: number;
  length: number;
};

function Progress({ curIndex, length }: Props) {
  return (
    <>
      <div className=" flex h-[2px] flex-1 items-center rounded-full bg-white/30 bg-opacity-50 text-white">
        <div
          style={{
            width: (((curIndex + 1) / length) * 100).toString() + "%",
          }}
          className={` h-[2px] rounded-full bg-[#e50914ff]  bg-opacity-50`}
        ></div>
      </div>
      <span
        key={curIndex}
        style={{
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          key={curIndex}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className=" flex items-center text-3xl font-medium text-white/70 lg:text-4xl"
        >
          {curIndex + 1 < 10 ? `0${curIndex + 1}` : `${curIndex + 1}`}
        </motion.div>
      </span>
    </>
  );
}

export default Progress;
