"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const element = document.getElementById(id);

    if (element) {
      element.classList.add("animate-highlight");
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => element.classList.remove("animate-highlight"), 2000);
    }
  }, []);
}
