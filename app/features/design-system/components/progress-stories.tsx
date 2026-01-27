import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"

export default function ProgressStories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Progress Indicators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Quest Progress</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="h-3" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Learning Path</span>
            <span>45%</span>
          </div>
          <Progress value={45} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
