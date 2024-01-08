"use client";

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
  const [days, setDays] = useState<number[]>([]);
  const [totalDays, setTotalDays] = useState(0);

  const currentDate = new Date();
  const startDate = Number(format(currentDate, "T")) - 15552000000;

  const numberOfDays = Math.ceil(
    (Number(format(currentDate, "T")) - startDate) / 86400000
  );

  const difCalc = (start: Date, end: Date) => {
    return Math.ceil(
      (Number(format(end, "T")) - Number(format(start, "T"))) / 86400000 + 1
    );
  };

  const setDaysHandler = (start: Date | undefined, end: Date | undefined) => {
    if (start !== undefined && end !== undefined) {
      setDays((days) => [...days, difCalc(start, end)]);
    }
  };

  const addHandler = () => {
    if (
      date?.from !== dateRange[dateRange.length - 1]?.from &&
      date?.from !== undefined
    ) {
      if (
        date?.to !== dateRange[dateRange.length - 1]?.to &&
        date?.to !== undefined
      ) {
        setDateRange((prevDateRange) => [...prevDateRange, date]);
        setDaysHandler(date?.from, date?.to);
      }
    }
  };

  const deleteHandler = (index: number) => {
    setDateRange((prevDateRange) => [
      ...prevDateRange.slice(0, index),
      ...prevDateRange.slice(index + 1),
    ]);
    setDays((prevDays) => [
      ...prevDays.slice(0, index),
      ...prevDays.slice(index + 1),
    ]);
  };

  useEffect(() => {
    setTotalDays(days?.reduce((a, b) => a + b, 0));
  }, [days, totalDays]);

  return (
    // console.log(days),

    <div
      className={cn(
        "flex flex-col gap-10 justify-between h-[calc(100vh_-_60px)] w-80",
        className
      )}
    >
      <div className="flex flex-col gap-2 justify-between">
        <div>
          <p className="border border-indigo-500 rounded-xl p-2">
            You can be in EU zone for{" "}
            <span className="font-bold ">{90 - totalDays}</span> days.
          </p>
          <p>Starting date: {format(startDate, "LLL dd, y")}</p>
          <p>Current date: {format(currentDate, "LLL dd, y")}</p>
          <p>Number of days: {numberOfDays}</p>
          <p>Total days selected: {totalDays}</p>
        </div>
        <div className="mb-8">
          <p className="mb-2">Selected ranges:</p>
          <ul className="flex flex-col gap-6 max-h-96 overflow-y-scroll no-scrollbar">
            {dateRange?.map((date, index) => (
              <li
                key={index}
                className="flex flex-col items-left justify-between"
              >
                <div className="flex gap-1">
                  <p>From: </p>
                  {date?.from ? format(date?.from, "LLL dd, y") : "Pick a date"}
                </div>
                <div className="flex gap-1">
                  <p>To: </p>
                  {date?.to ? format(date?.to, "LLL dd, y") : "Pick a date"}
                </div>
                <div className="flex flex-row mt-1 mb-3">
                  <p className="mr-1">Number of selected days: </p>
                  <div>
                    {date?.from && date?.to
                      ? difCalc(date.from, date.to)
                      : null}
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => deleteHandler(index)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex  gap-2">
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
                fromDate={new Date(startDate)}
                toDate={new Date()}
                showOutsideDays={true}
                disabled={dateRange}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={addHandler} className="w-20">
            Add
          </Button>
        </div>

        <Button
          variant={"destructive"}
          onClick={() => {
            setDate(undefined), setDateRange([]), setDays([]);
          }}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}
