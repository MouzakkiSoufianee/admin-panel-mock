import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function ColorsPaletteDs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray text-2xl font-semibold">Color Palette</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="bg-primary h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#003580</p>
          </div>
          <div className="space-y-2">
            <div className="bg-accent h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#5A7BFF</p>
          </div>
          <div className="space-y-2">
            <div className="bg-purple h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#A855F7</p>
          </div>
          <div className="space-y-2">
            <div className="bg-orange h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#FF964F</p>
          </div>
          <div className="space-y-2">
            <div className="bg-green h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#22C55E</p>
          </div>
          <div className="space-y-2">
            <div className="bg-red h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#F96767</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="bg-light-blue h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#D3EAFF</p>
          </div>
          <div className="space-y-2">
            <div className="bg-light-green h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#DBFFE8</p>
          </div>
          <div className="space-y-2">
            <div className="bg-light-pink h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#FFF4F2</p>
          </div>
          <div className="space-y-2">
            <div className="bg-light-purple h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#F4E8FF</p>
          </div>
          <div className="space-y-2">
            <div className="bg-light-gray h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#F2F2F2</p>
          </div>
          <div className="space-y-2">
            <div className="bg-light-yellow h-16 w-16 rounded-lg"></div>
            <p className="text-xs">#F8F3DD</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
