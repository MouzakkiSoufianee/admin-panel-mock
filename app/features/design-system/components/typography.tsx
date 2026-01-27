import React from "react";
import { Card,CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

export function TypographyDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Typography</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Heading 1 - Manrope Bold</h1>
          <h1 className="font-serif text-4xl font-bold">Heading 1 - Inter Bold</h1>
          <h2 className="text-3xl font-semibold">Heading 2 - Manrope SemiBold</h2>
          <h2 className="font-serif text-3xl font-semibold">Heading 2 - Inter SemiBold</h2>
          <h3 className="text-2xl font-medium">Heading 3 - Manrope Medium</h3>
          <h3 className="font-serif text-2xl font-medium">Heading 3 - Inter Medium</h3>
          <h4 className="text-xl font-normal">Heading 4 - Manrope Regular</h4>
          <h4 className="font-serif text-xl font-normal">Heading 4 - Inter Regular</h4>
          <p className="text-base">Body text - Manrope Regular</p>
          <p className="font-serif text-base">Body text - Inter Regular</p>
          <p className="text-muted-foreground text-sm">Small text - Manrope Regular</p>
          <p className="text-muted-foreground font-serif text-sm">Small text - Inter Regular</p>
        </div>
      </CardContent>
    </Card>
  );
}
