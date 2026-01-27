import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function AvatarStories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Avatars</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  )
}
