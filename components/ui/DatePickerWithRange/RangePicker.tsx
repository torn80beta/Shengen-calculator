"use client";

// import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
/*  */
import { HTMLAttributes } from "react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  // dob: z.object({
  from: z.date(),
  to: z.date(),
  // }),
});

export function DatePickerWithRange({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }[] | []>(
    []
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submit", date);
    // console.log(data);
    // setDateRange((dateRange) => [...dateRange, date]);
    // setDateRange((dateRange) => [...dateRange, data]);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    // console.log(dateRange),
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <div className={cn("grid gap-2", className)}> */}
        {/* <ul>
        {date &&
          date?.map((date, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                {date?.from ? format(date?.from, "LLL dd, y") : "Pick a date"}
              </div>
              <div>
                {date?.to ? format(date?.to, "LLL dd, y") : "Pick a date"}
              </div>
            </li>
          ))}
      </ul> */}
        <div className="mb-24">
          <p>Array of ranges:</p>
          <div>
            {dateRange?.map((date, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  {date?.from ? format(date?.from, "LLL dd, y") : "Pick a date"}
                </div>
                <div>
                  {date?.to ? format(date?.to, "LLL dd, y") : "Pick a date"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p>Selected range:</p>
          <div className="flex ">
            <p className="mr-2">From:</p>
            {date?.from ? format(date?.from, "LLL dd, y") : "Pick a date"}
          </div>
          <div className="flex ">
            <p className="mr-2">To:</p>
            {date?.to ? format(date?.to, "LLL dd, y") : "Pick a date"}
          </div>
        </div>

        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select date range.</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date?.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date range is used to calculate your limits.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
