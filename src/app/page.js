import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "SkimStones Smart Essentials",
  description: "Innovative projects dedicated to circularity and energy transition.",
};

export default function HomePage() {
  return (
    <div className="mobile-frame">
      <Header />
      <main className="home-main">
        <p className="hero-tagline">
          At SKIMSTONES Services, our purpose is to implement innovative
          projects dedicated to circularity and energy transition.
        </p>

        <div className="home-row">
          <p>
            Therefore, we developped SQWEEZY, a handy new tool making life
            easier with household recyclable waste
          </p>
          <Link href="/sqweezy" className="cta-btn cta-sqweezy">
            <span className="cta-discover">DISCOVER</span>
            <Image
              src="/logo-sqweezy-long.png"
              alt="SQWEEZY"
              width={90}
              height={28}
              style={{ objectFit: "contain", width: "90px", height: "28px" }}
            />
          </Link>
        </div>

        <div className="home-row">
          <p>
            Moreover, SKIMSTONES Services provides strategic and technical
            support for energy transition projects.
          </p>
          <Link href="/consulting-services" className="cta-btn cta-services">
            SERVICES
          </Link>
        </div>

        <div className="home-row">
          <p>Discover Skimstones&apos; founders profile and vision</p>
          <Link href="/founders" className="cta-btn cta-founders">
            FOUNDERS
          </Link>
        </div>

        <div className="home-row">
          <p>Contact us to get an appointment</p>
          <Link href="/contact" className="cta-btn cta-contact">
            CONTACT US
          </Link>
        </div>
      </main>
    </div>
  );
}
