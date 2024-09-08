'use client'
import Header from "@components/Header/Header";
import Search from "@sections/Search/Search";
import Footer from "@components/Footer/Footer";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-evenly md:items-center pt-8 md:p-16">
      <Header />
      <main className="flex flex-col md:items-center">
        <Search />
      </main>
      <Footer />
    </div>
  );
}
