import { Suspense } from "react";
import { UpdateEvent } from "@/app/features/events/update";

export default function UpdateEventPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">Loading...</p></div>}>
      <UpdateEvent />
    </Suspense>
  );
}
