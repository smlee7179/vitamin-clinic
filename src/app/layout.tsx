import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AccessibilityBar from "../components/layout/AccessibilityBar";
import FabCall from "../components/layout/FabCall";

export const metadata = {
  title: '비타민 의원 - 부산 정형외과',
  description: '노인 친화적 + 최신 트렌드 의료 웹사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Header />
        <AccessibilityBar />
        <main className="pt-20">{children}</main>
        <FabCall />
        <Footer />
      </body>
    </html>
  );
}
