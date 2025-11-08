import React from "react";
import Banner from "./Banner";
import CategorySection from "./CategorySection";
import RecentComplaints from "./RecentComplaints";

const Home = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      <RecentComplaints />
    </div>
  );
};

export default Home;
