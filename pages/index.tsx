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
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <p>Welcome to Shengen calculator!</p>
        <DatePickerWithRange />
        {/* <DatePickerForm /> */}
      </main>
      <Toaster />
    </>
  );
}
