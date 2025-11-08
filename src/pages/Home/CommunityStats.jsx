import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaUsers } from "react-icons/fa";
import StatCard from "../../components/StatCard";

const CommunityStats = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Our Community Impact</h2>
        <p className="text-base text-gray-500 mt-2">
          Track our collective progress and see the difference we're making
          together.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <StatCard
          icon={<FaUsers />}
          title="Registered Users"
          value={31000}
          change="↗︎ 400 (22%)"
          gradientClass="bg-gradient-to-br from-blue-500 to-cyan-400"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Issues Resolved"
          value={4200}
          change="↗︎ 40 (2%)"
          gradientClass="bg-gradient-to-br from-green-500 to-emerald-400"
        />
        <StatCard
          icon={<FaHourglassHalf />}
          title="Pending Issues"
          value={1200}
          change="↘︎ 90 (14%)"
          gradientClass="bg-gradient-to-br from-yellow-500 to-amber-400"
        />
      </div>
    </div>
  );
};

export default CommunityStats;
