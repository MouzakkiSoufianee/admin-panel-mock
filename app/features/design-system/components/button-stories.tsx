import { Upload } from "lucide-react"

import { Button, ButtonProps } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const BUTTONS_ITEMS: {
  disabled?: boolean
  label: React.ReactNode
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
}[] = [
  { label: "Primary Button", variant: "primary" },
  { label: "Secondary Button", variant: "secondary" },
  { label: "Destructive Button", variant: "destructive" },
  { label: "Outline Button", variant: "outline" },
  { label: "Link Button", variant: "link" },
  { label: "Ghost Button", variant: "ghost" },

  { label: "Xl Button", size: "xl" },
  { label: "Default Button", size: "default" },
  { label: "Sm Button", size: "sm" },
  { label: <Upload />, size: "icon" },

  { label: "Disabled Button", disabled: true },
]

export default function ButtonStories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Buttons</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-5 gap-5">
        {BUTTONS_ITEMS.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <Button size={item.size} variant={item.variant} disabled={item.disabled}>
              {item.label}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
