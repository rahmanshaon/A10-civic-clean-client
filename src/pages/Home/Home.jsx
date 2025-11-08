import React from "react";
import Banner from "./Banner";
import CategorySection from "./CategorySection";
import RecentComplaints from "./RecentComplaints";
import CommunityStats from "./CommunityStats";

const Home = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      <RecentComplaints />
      <CommunityStats />
    </div>
  );
};

export default Home;
