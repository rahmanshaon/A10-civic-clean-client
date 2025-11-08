import React from "react";
import Banner from "./Banner";
import CategorySection from "./CategorySection";
import RecentComplaints from "./RecentComplaints";
import CommunityStats from "./CommunityStats";
import VolunteerCTA from "./VolunteerCTA";
import NewsletterCTA from "./NewsletterCTA";

const Home = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      <RecentComplaints />
      <CommunityStats />
      <VolunteerCTA />
      <NewsletterCTA/>
    </div>
  );
};

export default Home;
