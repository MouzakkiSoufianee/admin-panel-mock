import { RewardItem, RewardItemData } from "@/app/components/ui/reward-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const achievementExamples: RewardItemData[] = [
  {
    id: "bronze-example",
    title: "Bronze Trophy",
    description: "First Mission Completed",
    status: "Earned 3 days ago",
    xp: 500,
    variant: "bronze",
    completed: true,
  },
  {
    id: "silver-example",
    title: "Silver Trophy",
    description: "Team Collaborator",
    status: "Earned 2 days ago",
    xp: 1000,
    variant: "silver",
    completed: true,
  },
  {
    id: "gold-example",
    title: "Gold Trophy",
    description: "Quick Learner",
    status: "Earned 1 day ago",
    xp: 1500,
    variant: "gold",
    completed: true,
  },
  {
    id: "diamond-example",
    title: "Diamond Trophy",
    description: "Connected Phase Completed",
    status: "Earned today",
    xp: 2000,
    variant: "diamond",
    completed: true,
  },
]

export default function AchievementsStories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-2">
          {achievementExamples.map((achievement) => (
            <div key={achievement.id} className="rounded-lg border bg-gray-50 p-4">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700 capitalize">{achievement.variant} Trophy</span>
              </div>
              <RewardItem item={achievement} />
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Color Specifications</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 h-16 w-full rounded border bg-[#FFFBF3]"></div>
              <h4 className="font-medium text-[#FFB000]">Bronze</h4>
              <p className="text-xs text-gray-600">Background: #FFFBF3</p>
              <p className="text-xs text-gray-600">Text: #FFB000</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 h-16 w-full rounded border bg-[#E9EDFF]"></div>
              <h4 className="font-medium text-[#5A7BFF]">Silver</h4>
              <p className="text-xs text-gray-600">Background: #E9EDFF</p>
              <p className="text-xs text-gray-600">Text: #5A7BFF</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 h-16 w-full rounded border bg-[#F7F1FF]"></div>
              <h4 className="font-medium text-[#A855F7]">Gold</h4>
              <p className="text-xs text-gray-600">Background: #F7F1FF</p>
              <p className="text-xs text-gray-600">Text: #A855F7</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 h-16 w-full rounded border bg-[#DBFFE8]"></div>
              <h4 className="font-medium text-[#35B26B]">Diamond</h4>
              <p className="text-xs text-gray-600">Background: #DBFFE8</p>
              <p className="text-xs text-gray-600">Text: #35B26B</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
