import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatCard = ({
  icon,
  title,
  value,
  change,
  gradientClass,
  ...aosProps
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      {...aosProps}
      className="bg-base-100 border border-base-300 shadow-lg rounded-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      <div
        className={`relative inline-block text-4xl text-white mb-4 p-5 rounded-full ${gradientClass}`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-medium text-base-content text-opacity-70">
        {title}
      </h3>

      <p className="text-5xl font-bold text-base-content my-2">
        {inView ? <CountUp end={value} duration={2.5} separator="," /> : "0"}
      </p>

      <p className="text-sm text-base-content text-opacity-60">{change}</p>
    </div>
  );
};

export default StatCard;
