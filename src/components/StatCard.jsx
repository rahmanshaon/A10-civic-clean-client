import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatCard = ({ icon, title, value, change, gradientClass }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="shadow-xl rounded-xl p-6 text-center">
      <div
        className={`relative inline-block text-4xl text-white mb-4 p-4 rounded-full ${gradientClass}`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-medium text-gray-600">{title}</h3>

      <p className="text-5xl font-bold text-gray-800 my-2 ">
        {inView ? <CountUp end={value} duration={2.5} separator="," /> : "0"}
      </p>

      <p className="text-sm text-slate-400">{change}</p>
    </div>
  );
};

export default StatCard;
