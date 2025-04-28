import EmptyCategoryCard from "@/app/_components/EmptyCategoryCard";
import { useMonthContext } from "@/app/_context/dateContext";
import SpinnerMini from "@/app/_components/SpinnerMini";

export default function Page() {
  const { isDateLoading, targetMonth, targetYear } = useMonthContext();

  if (isDateLoading) {
    return <SpinnerMini />;
  }

  return (
    <div>
      <EmptyCategoryCard />
    </div>
  );
}
