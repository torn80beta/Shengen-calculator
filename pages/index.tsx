import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { DatePickerForm } from "@/components/ui/DatePickerForm/DatePickerForm";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange/DatePickerWithRange";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { toast } = useToast();

  return (
    <>
      {/* <main
        className={`page-container flex flex-col items-center w-full p-4 bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-500 ${inter.className}`}
      > */}
      <main
        className={`page-container w-full p-4 bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-500 ${inter.className}`}
      >
        {/* <p>Welcome to Shengen calculator!</p> */}
        <DatePickerWithRange />
      </main>
      <Toaster />
    </>
  );
}
