"use client";

import { useEffect } from "react";
import { usePageTitle } from "../contexts/page-title-context";
import { TypographyDemo } from "../features/design-system/components/typography";
import ColorsPaletteDs from "../features/design-system/components/colors-palette-ds";
import ButtonStories from "../features/design-system/components/button-stories";
import TagStories from "../features/design-system/components/tags-stories";
import ProgressStories from "../features/design-system/components/progress-stories";
import AvatarStories from "../features/design-system/components/avatar-stories";
import AchievementsStories from "../features/design-system/components/achievements-stories";

export default function DesignSystemPage() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Design System');
  }, [setPageTitle]);
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Design System</h1>
        </div>
        {/* Design System */}
        <TypographyDemo />
        <ColorsPaletteDs />

        {/* Stories  */}
        <ButtonStories />
        <TagStories />
        <ProgressStories />
        <AvatarStories />
        <AchievementsStories />
      </div>
    </div>
  );
}
