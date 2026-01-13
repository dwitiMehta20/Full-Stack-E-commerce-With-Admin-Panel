import OurPolicy from "../components/OurPolicy";
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />

    </div>
  );
}

export default Home;
