"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getTargetMonthAfterLogin } from "@/app/_services/data-service";
import Spinner from "@/app/_components/Spinner";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status, date } = await getTargetMonthAfterLogin();

      if (status === "empty") {
        router.replace("/set-budget");
      } else if (status === "single" && date?.id) {
        document.cookie = `dateId=${date.id}; path=/; max-age=${
          60 * 60 * 24 * 14
        }`;
        router.replace("/spent");
      } else if (status === "multiple") {
        router.replace("/month-select");
      }
    })();
  }, [router]);

  return <Spinner />;
}
