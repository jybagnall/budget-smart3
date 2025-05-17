"use client";
import { createContext, useContext, useState, useEffect } from "react";

import { getTargetMonthAfterLogin } from "@/app/_services/data-service";

const MonthContext = createContext();

export function MonthProvider({ children }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [targetMonth, setTargetMonth] = useState(currentMonth);
  const [targetYear, setTargetYear] = useState(currentYear);
  const [dateId, setDateId] = useState(null);
  const [isDateLoading, setIsDateLoading] = useState(true);

  const updateTargetMonth = async () => {
    try {
      const { status, date } = await getTargetMonthAfterLogin();

      if (!status || !date) return;

      if (status === "single") {
        setTargetMonth(date.month - 1);
        setTargetYear(date.year);
        setDateId(date.id);
      }
      // maybe handle 'multiple' status
    } catch (error) {
      console.error("Failed to fetch target month:", error);
    } finally {
      setIsDateLoading(false);
    }
  };

  useEffect(() => {
    updateTargetMonth();
  }, []);

  const handleMonthChange = (direction) => {
    setTargetMonth((month) => {
      let newMonth = month;

      if (direction === "prev") {
        if (month === 0) {
          newMonth = 11;
          setTargetYear((year) => year - 1);
        } else {
          newMonth = month - 1;
        }
      } else if (direction === "next") {
        if (month === 11) {
          newMonth = 0;
          setTargetYear((year) => year + 1);
        } else {
          newMonth = month + 1;
        }
      }
      return newMonth;
    });
  };

  const isSubmittingPast = () =>
    (targetYear === currentYear && targetMonth < currentMonth) ||
    targetYear < currentYear;

  return (
    <MonthContext.Provider
      value={{
        targetMonth,
        targetYear,
        dateId,
        setTargetMonth,
        setTargetYear,
        setDateId,
        handleMonthChange,
        isSubmittingPast,
        isDateLoading,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
}

export function useMonthContext() {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error("useMonthContext must be used within a MonthProvider");
  }
  return context;
}
