import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Circle, CircleCheck } from "lucide-react"

import { View } from "@/types"

export default function SelectRegions({ regions, setView, regionsAvailable }: { regions: string[], setView: React.Dispatch<React.SetStateAction<View>>, regionsAvailable: string[] }) {


    return (
        <div className="min-w-full">
            <div className="flex items-center justify-between">
                <Label htmlFor="select-region">Vyberte kraj</Label>
                {regions.length < regionsAvailable.length / 2 && <Button variant={"link"} size={"sm"} onClick={() => { setView((prev: any) => { return { ...prev, regions: regionsAvailable } }) }}>vybrat vše</Button>}
                {regions.length > regionsAvailable.length / 2 && <Button variant={"link"} size={"sm"} onClick={() => { setView((prev: any) => { return { ...prev, regions: [] } }) }}>zrušit vše</Button>}</div>

            <ToggleGroup
                id={"select-rok"}
                type={"multiple"}
                variant={"outline"}
                value={regions}
                onValueChange={
                    (regions) => {
                        setView((prev: any) => { return { ...prev, regions } })
                    }
                }
                className="flex flex-wrap gap-1"

            >
                {regionsAvailable.map((region, index) => (
                    <ToggleGroupItem
                        key={`${index}-${region}`}
                        value={region}
                        className={""}
                    >
                        {regions.includes(region) ? <CircleCheck className="h-4 w-4 pr-1" /> : <Circle className="h-4 w-4 pr-1" />}
                        {region}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>

    )

}