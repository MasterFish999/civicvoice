import "./globals.css";
import { AuthProvider } from "../components/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "CivicVoice",
  description: "A student civic engagement site for Texas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="page-shell">
            <Header />
            <main className="shell">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
