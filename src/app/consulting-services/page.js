import Header from "@/components/Header";

export const metadata = {
  title: "Services — SkimStones Smart Essentials",
  description: "SKIMSTONES offers various services dedicated to energy transition actors.",
};

export default function ConsultingServicesPage() {
  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">
          SKIMSTONES offers various services dedicated to energy transition
          actors
        </h1>
        {/* Le contenu détaillé des services sera ajouté ici */}
      </main>
    </div>
  );
}
