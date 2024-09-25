import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-6xl font-[family-name:var(--font-geist-sans)]">
              Next.js
            </h1>
            <p className="text-lg sm:text-xl font-[family-name:var(--font-geist-mono)]">
              The React Framework for Production
            </p>
          </div>
          <div className="hidden sm:block">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={180}
              priority
            />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm sm:text-base font-[family-name:var(--font-geist-mono)]">
          &copy; {new Date().getFullYear()} Next.js
        </p>
      </footer>
    </div>
  );
}
