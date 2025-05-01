import { getTargetMonthAfterLogin } from "@/app/_services/data-service";
import { redirect } from "next/navigation";
import Spinner from "@/app/_components/Spinner";

export default async function Page() {
  const { status } = await getTargetMonthAfterLogin();

  if (status === "empty") {
    redirect("/set-budget");
  } else if (status === "single") {
    redirect("/spent");
  } else if (status === "multiple") {
    redirect("/month-select");
  }
  return <Spinner />;
}
