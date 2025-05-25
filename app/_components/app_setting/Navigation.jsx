import { auth } from "@/app/_services/auth";
import { getAvailableMonths } from "@/app/_services/date.data-service";
import NavigationCollapse from "./NavigationCollapse";

export default async function Navigation() {
  const session = await auth();
  const { status } = await getAvailableMonths();

  const userHasNoData = status == "empty";

  return <NavigationCollapse session={session} userHasNoData={userHasNoData} />;
}
