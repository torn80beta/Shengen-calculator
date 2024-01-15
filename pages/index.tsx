import { Inter } from "next/font/google";
import Head from "next/head";
import dynamic from "next/dynamic";

/* disable prerendering of dynamic components to prevent hydration mismatches */
const DatePickerWithRange = dynamic(
  () => import("../components/ui/DatePickerWithRange/DatePickerWithRange"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>EU traveler assistant</title>
        <meta name="EU traveler assistant" content="EU traveler assistant" />
      </Head>
      <main
        className={`page-container w-full p-4 bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-500 ${inter.className}`}
      >
        <DatePickerWithRange />
      </main>
    </>
  );
}
