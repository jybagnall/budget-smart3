"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import MonthsDropdown from "./MonthsDropdown";
import { useState } from "react";

export default function MonthSelectAfterLogin({ dates }) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="relative w-full max-w-md transform rounded-2xl bg-white px-8 py-12 text-center shadow-xl transition-all min-h-[300px]">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Which budget do you want to work with?
          </h2>
          <MonthsDropdown dates={dates} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
