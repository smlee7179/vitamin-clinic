import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NoticeList from "../../components/notices/NoticeList";

export default function Notices() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-vitamin-500 via-vitamin-400 to-vitamin-300">
          <div className="absolute inset-0 bg-gradient-to-br from-vitamin-500/90 via-vitamin-400/80 to-vitamin-300/60" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
              공지사항
            </h1>
            <p className="text-lg sm:text-xl text-white/95 font-medium">
              병원의 새로운 소식과 공지사항을 확인하세요
            </p>
          </div>
        </section>

        <NoticeList />
      </main>
      <Footer />
    </>
  );
}
