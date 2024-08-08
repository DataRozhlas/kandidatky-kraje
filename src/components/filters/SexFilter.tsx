import { FilterPropsType } from "../../types";
import { useState } from "react";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


export default function SexFilter(props: FilterPropsType) {
    const [selectedSex, setSelectedSex] = useState<string>("A")

    const handleValueChange = (value: string) => {
        setSelectedSex(value)
        const newSex = value === "A" ? ["M", "F"] : [value]
        props.setView((prev) => {
            return {
                ...prev,
                sex: newSex
            }
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="sexFilter">Podle pohlaví</Label>
            <RadioGroup id="sexFilter" className="flex flex-row justify-between" value={selectedSex} onValueChange={handleValueChange}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="F" id="sexF" />
                    <Label htmlFor="sefF">Ženy</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="sexM" />
                    <Label htmlFor="sexM">Muži</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="sexAll" />
                    <Label htmlFor="sexAll">Všichni</Label>
                </div>
            </RadioGroup>

        </div>
    )
}