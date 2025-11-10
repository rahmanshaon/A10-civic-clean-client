import React from "react";
import Banner from "./Banner";
import CategorySection from "./CategorySection";
import RecentComplaints from "./RecentComplaints";
import CommunityStats from "./CommunityStats";
import VolunteerCTA from "./VolunteerCTA";
import NewsletterCTA from "./NewsletterCTA";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner />
      <CommunityStats />
      <CategorySection />
      <RecentComplaints />
      <VolunteerCTA />
      <NewsletterCTA />
    </div>
  );
};

export default Home;
