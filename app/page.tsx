'use client'
import Search from "@app/components/Search/Search";


export default function Home() {
  return (
    <div className="flex flex-col min-h-[80vh]">
      <main className="flex flex-col items-center w-full">
        <Search />
      </main>
    </div>
  );
}
