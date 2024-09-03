// import Image from "next/image";
import Header from "@/components/Header/Header";
import Search from "@/components/Search/Search";
import MovieBox from "@/components/MovieBox/MovieBox";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <>
        <Header />
        <Search />
        <MovieBox />
        <Footer />
      </>
    </main>
  );
}
