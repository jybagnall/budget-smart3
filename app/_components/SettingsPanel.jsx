"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import ConfirmationModalMsg from "@/app/_components/ConfirmationModalMsg";
import {
  deleteUserAccount,
  resetSpendingRecords,
} from "@/app/_services/actions";

export default function SettingPanel({ dateId }) {
  const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
  const [resetWarningOpen, setResetWarningOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/settings/delete-confirmation" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      {/* Reset Data */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Reset Spending Data
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          This will remove all recorded expenditures, but your budget categories
          will remain intact.
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setResetWarningOpen(true)}
            className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
          >
            Reset Data
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Delete Account */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          This will permanently delete your account and remove all your data.
          This action cannot be undone.
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDeleteWarningOpen(true)}
            className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {resetWarningOpen && (
        <ConfirmationModalMsg
          serverAction={() => resetSpendingRecords(dateId)}
          deleteMsg="Yes, Reset Data"
        />
      )}

      {deleteWarningOpen && (
        <ConfirmationModalMsg
          serverAction={deleteUserAccount}
          handleSignOut={handleSignOut}
          deleteMsg="YES, DELETE MY ACCOUNT"
        />
      )}
    </div>
  );
}
