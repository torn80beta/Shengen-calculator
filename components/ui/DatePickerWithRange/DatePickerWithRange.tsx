"use client";

// import * as React from "react";
import { format } from "date-fns";
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

import { HTMLAttributes, useEffect } from "react";
import { useState } from "react";

export function DatePickerWithRange({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [dateRange, setDateRange] = useState<DateRange[]>([]);

  useEffect(() => {
    if (
      date?.from !== dateRange[dateRange.length - 1]?.from &&
      date?.from !== undefined
    ) {
      if (
        date?.to !== dateRange[dateRange.length - 1]?.to &&
        date?.to !== undefined
      ) {
        setDateRange((prevDateRange) => [...prevDateRange, date]);
      }
    }
  }, [date, dateRange]);

  return (
    // console.log(dateRange),
    <div className={cn("grid gap-2", className)}>
      <div className="mb-24">
        <p>Selected of ranges:</p>
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
      <Popover>
        <PopoverTrigger asChild>
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
              date.to ? (
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
    </div>
  );
}
