'use client'
import Search from "@app/components/Search/Search";


export default function Home() {
  return (
    <div className="flex flex-col min-h-[80vh] pt-8 md:p-12">
      <main className="flex flex-col md:items-center w-full">
        <Search />
      </main>
    </div>
  );
}
