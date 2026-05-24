import "./globals.css";

export const metadata = {
  title: "SkimStones Smart Essentials",
  description: "Innovative projects dedicated to circularity and energy transition.",
  icons: { icon: "/images/favicon-sks.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
