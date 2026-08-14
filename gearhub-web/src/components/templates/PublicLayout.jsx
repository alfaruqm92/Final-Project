import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#EAECF0]">
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;