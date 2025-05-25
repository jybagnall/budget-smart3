"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

import {
  deleteUserAccount,
  resetSpendingRecords,
} from "@/app/_services/actions";
import ConfirmationModalMsg from "@/app/_components/shared/ConfirmationModalMsg";
import { deleteThisMonth } from "@/app/_services/actions";

const deleteStyle =
  "rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition disabled:opacity-50";

export default function SettingPanel({ dateId, monthName }) {
  const [resetWarningOpen, setResetWarningOpen] = useState(false);
  const [deleteMonthWarningOpen, setDeleteMonthWarningOpen] = useState(false);
  const [deleteAccountWarningOpen, setDeleteAccountWarningOpen] =
    useState(false);

  const [isResetting, setIsResetting] = useState(false);
  const [isDeletingMonth, setIsDeletingMonth] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const router = useRouter();

  const handleResetSpendingRecords = async () => {
    setIsResetting(true);
    try {
      await resetSpendingRecords(dateId);
      toast.success("Successfully reset the spending record");
      router.push("/spent");
    } catch (e) {
      console.error("RESET ERROR", e);
      toast.error("Failed to reset the spending record");
    } finally {
      setIsResetting(false);
    }
  };

  const handleMonthDeletion = async () => {
    setIsDeletingMonth(true);
    try {
      await deleteThisMonth(dateId);
      document.cookie = "dateId=; path=/; max-age=0";
      toast.success("Successfully deleted the requested month");
      router.push("/settings/after-month-deletion");
    } catch (err) {
      toast.error("Failed to delete requested month");
    } finally {
      setIsDeletingMonth(false);
    }
  };

  const handleDeleteUserAccount = async () => {
    setIsDeletingAccount(true);
    try {
      await deleteUserAccount();
    } catch (err) {
      toast.error(err?.message || "Failed to delete the account");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/settings/delete-confirmation" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 px-4 py-10 sm:px-6 lg:px-8">
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
            disabled={isResetting}
            className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition disabled:opacity-50"
          >
            {isResetting ? "Resetting..." : "Reset Data"}
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Erase Current Month
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          This will permanently erase all data associated with the current month
          and the month itself. The month will be removed entirely from your
          history.
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDeleteMonthWarningOpen(true)}
            disabled={isDeletingMonth}
            className={deleteStyle}
          >
            {isDeletingMonth ? "Erasing..." : `Erase ${monthName}`}
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      <div>
        <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          This will permanently delete your account and remove all your data.
          This action cannot be undone.
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDeleteAccountWarningOpen(true)}
            disabled={isDeletingAccount}
            className={deleteStyle}
          >
            {isDeletingAccount ? "Deleting account..." : "Delete Account"}
          </button>
        </div>
      </div>

      {resetWarningOpen && (
        <ConfirmationModalMsg
          serverAction={handleResetSpendingRecords}
          deleteMsg="Yes, Reset Data"
        />
      )}

      {deleteMonthWarningOpen && (
        <ConfirmationModalMsg
          serverAction={handleMonthDeletion}
          deleteMsg="YES, DELETE THIS MONTH"
        />
      )}

      {deleteAccountWarningOpen && (
        <ConfirmationModalMsg
          serverAction={handleDeleteUserAccount}
          handleSignOut={handleSignOut}
          deleteMsg="YES, DELETE MY ACCOUNT"
        />
      )}

      {(isDeletingAccount || isResetting || isDeletingMonth) && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="text-white">Processing...</div>
        </div>
      )}
    </div>
  );
}
