"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/contexts/ThemeContext"
import { Palette, Check } from "lucide-react"

const accentColors = [
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Orange", value: "orange", color: "bg-orange-500" },
  { name: "Red", value: "red", color: "bg-red-500" },
]

export function ThemeCustomizer() {
  const { accentColor, setAccentColor } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Customization
        </CardTitle>
        <CardDescription>Personalize your CVAuto experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Accent Color</Label>
          <div className="flex flex-wrap gap-2">
            {accentColors.map((color) => (
              <Button
                key={color.value}
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${
                  accentColor === color.value ? "ring-2 ring-offset-2 ring-blue-500" : ""
                }`}
                onClick={() => setAccentColor(color.value as any)}
              >
                <div className={`w-4 h-4 rounded-full ${color.color}`} />
                {color.name}
                {accentColor === color.value && <Check className="h-3 w-3" />}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Preview</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-sm">Primary buttons and links</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/10" />
              <span className="text-sm">Accent backgrounds</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
