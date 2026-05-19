import Header from "@/components/Header";

export default function SqweezyPage() {
  return (
    <div className="mobile-frame sqweezy-frame">
      <Header variant="sqweezy" />

      <div className="sqweezy-fixed-top">
        <div className="sqweezy-badge">100% recycled ABS – CE Certified</div>
        <h1 className="sqweezy-title">
          Welcome to SQWEEZY, the smart compactor that changes life at home
        </h1>
      </div>

      <main className="sqweezy-scroll">
        {/* Le contenu produit défilant sera ajouté ici */}
        <p className="text-placeholder">Text content</p>
      </main>

      <footer className="sqweezy-footer">
        <div className="sqweezy-footer-grid">
          <button className="footer-btn btn-order">ORDER</button>
          <button className="footer-btn btn-mysqweezy">MY SQWEEZY</button>
          <button className="footer-btn btn-pro">
            PROFESSIONAL SOLUTIONS
          </button>
          <button className="footer-btn btn-investors">
            INVESTORS OPPORTUNITY
          </button>
        </div>
      </footer>
    </div>
  );
}
