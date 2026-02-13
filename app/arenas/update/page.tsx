import { Suspense } from "react";
import UpdateArenaPage from "@/app/features/arenas/update";

export default function WrappedUpdateArenaPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">Loading...</p></div>}>
      <UpdateArenaPage />
    </Suspense>
  );
}
