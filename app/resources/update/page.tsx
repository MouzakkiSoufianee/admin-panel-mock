import { Suspense } from "react";
import UpdateResource from "@/app/features/resources/update";

export default function UpdateResourcePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">Loading...</p></div>}>
      <UpdateResource />
    </Suspense>
  );
}