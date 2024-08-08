import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Circle, CircleCheck } from "lucide-react"

import { View } from "@/types"

export default function SelectYears({ years, setView, yearsAvailable }: { years: string[], setView: React.Dispatch<React.SetStateAction<View>>, yearsAvailable: string[] }) {


    return (
        <div className="min-w-full">
            <div className="flex items-center justify-between">
                <Label htmlFor="select-rok">Vyberte rok</Label>
                {years.length < yearsAvailable.length / 2 && <Button variant={"link"} size={"sm"} onClick={() => { setView((prev: any) => { return { ...prev, years: yearsAvailable } }) }}>vybrat vše</Button>}
                {years.length > yearsAvailable.length / 2 && <Button variant={"link"} size={"sm"} onClick={() => { setView((prev: any) => { return { ...prev, years: [] } }) }}>zrušit vše</Button>}</div>

            <ToggleGroup id={"select-rok"} type={"multiple"} variant={"outline"} value={years} onValueChange={
                (years) => {
                    setView((prev: any) => { return { ...prev, years } })
                }
            }
            >
                {yearsAvailable.map((year, index) => (
                    <ToggleGroupItem
                        key={`${index}-${year}`}
                        value={year}
                        className={"w-1/5"}
                    >
                        {years.includes(year) ? <CircleCheck className="h-4 w-4 pr-1" /> : <Circle className="h-4 w-4 pr-1" />}
                        {year}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>

    )

}