import { FilterPropsType } from "../../types";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


export default function MandateFilter(props: FilterPropsType) {

    const handleValueChange = (value: string) => {
        props.setView((prev) => {
            return {
                ...prev,
                mandate: value
            }
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="mandateFilter">Podle mandátu</Label>
            <RadioGroup id="mandateFilter" className="grid grid-cols-2" value={props.view.mandate} onValueChange={handleValueChange}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="mandateA" />
                    <Label htmlFor="mandateA">Získali mandát</Label>
                </div>
                <div className="flex items-center  space-x-2">
                    <RadioGroupItem value="N" id="mandateN" />
                    <Label htmlFor="mandateN">Nezískali mandát</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="P" id="mandateP" />
                    <Label htmlFor="mandateP">Díky preferenčním hlasům</Label>
                </div>
                <div className="flex items-center  space-x-2">
                    <RadioGroupItem value="X" id="mandateX" />
                    <Label htmlFor="mandateX">Všichni</Label>
                </div>
            </RadioGroup>

        </div>
    )
}