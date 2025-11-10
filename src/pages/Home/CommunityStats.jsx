import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaUsers } from "react-icons/fa";
import StatCard from "../../components/StatCard";
import Lottie from "lottie-react";

import celebrationAnimation from "../../assets/lottie.json";

const CommunityStats = () => {
  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 sm:gap-4">
            {/* Left Animation */}
            <Lottie
              animationData={celebrationAnimation}
              loop={true}
              className="w-24 h-24 hidden sm:block"
            />

            <h2 className="text-3xl md:text-4xl font-black text-gradient">
              Our Community Impact
            </h2>

            {/* Right Animation */}
            <Lottie
              animationData={celebrationAnimation}
              loop={true}
              className="w-24 h-24 hidden sm:block transform -scale-x-100"
            />
          </div>

          <p className="text-base text-base-content/80 text-opacity-70 mt-2 max-w-2xl mx-auto">
            Track our collective progress and see the difference we're making
            together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StatCard
            data-aos="fade-up"
            data-aos-delay="0"
            icon={<FaUsers />}
            title="Registered Users"
            value={31000}
            change="↗︎ 400 (22%)"
            gradientClass="bg-gradient-to-br from-blue-500 to-cyan-400"
          />
          <StatCard
            data-aos="fade-up"
            data-aos-delay="150"
            icon={<FaCheckCircle />}
            title="Issues Resolved"
            value={4200}
            change="↗︎ 40 (2%)"
            gradientClass="bg-gradient-to-br from-green-500 to-emerald-400"
          />
          <StatCard
            data-aos="fade-up"
            data-aos-delay="300"
            icon={<FaHourglassHalf />}
            title="Pending Issues"
            value={1200}
            change="↘︎ 90 (14%)"
            gradientClass="bg-gradient-to-br from-yellow-500 to-amber-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
