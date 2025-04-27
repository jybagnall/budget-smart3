import SetBudgetForm from "@/app/_components/SetBudgetForm";

export default function Page() {
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md min-h-[calc(100vh-100px)]">
        <SetBudgetForm />
      </div>
    </div>
  );
}
