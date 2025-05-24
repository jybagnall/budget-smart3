import SetBudgetForm from "@/app/_components/budget/SetBudgetForm";

export default function Page() {
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col items-center justify-start w-full max-w-md pt-10">
        <SetBudgetForm />
      </div>
    </div>
  );
}
