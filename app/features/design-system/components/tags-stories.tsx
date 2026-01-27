import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tag, TagProps } from "@/app/components/ui/tag"

const TAG_ITEMS: {
  showDot?: boolean
  label: React.ReactNode
  size?: TagProps["size"]
  variant?: TagProps["variant"]
}[] = [
  { label: "In Progress", variant: "in-progress", showDot: true },
  { label: "Completed", variant: "completed", showDot: true },
  { label: "Upcoming", variant: "upcoming", showDot: true },
  { label: "Pending", variant: "pending", showDot: true },
  { label: "Filled Purple", variant: "filled-purple", showDot: true },

  { label: "Success", variant: "success" },
  { label: "Warning", variant: "warning" },
  { label: "Error", variant: "error" },
  { label: "Info", variant: "info" },

  { label: "Lg Tag", size: "lg" },
  { label: "Default Tag", size: "default" },
  { label: "Sm Tag", size: "sm" },
]

export default function TagStories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Tags</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-5">
        {TAG_ITEMS.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <Tag {...item}>{item.label}</Tag>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
