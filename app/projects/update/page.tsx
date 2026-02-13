import { Suspense } from "react";
import { UpdateProject } from "@/app/features/projects/update";

export default function UpdateProjectPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">Loading...</p></div>}>
      <UpdateProject />
    </Suspense>
  );
}
