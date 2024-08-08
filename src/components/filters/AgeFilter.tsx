import { FilterPropsType, Candidate } from "@/types";

import { useEffect, useState } from 'react'

import { Label } from '../ui/label'
import { Slider } from '../ui/slider'


export default function AgeFilter(props: FilterPropsType) {
    const [minMaxAge, setMinMaxAge] = useState<[number, number]>([0, 100])
    const [hasChanged, setHasChanged] = useState<boolean>(false)


    const handleValueChange = (value: [number, number]) => {
        props.setView((prev) => { return { ...prev, age: value } })
        setHasChanged(true)
    }

    useEffect(() => {
        if (props.data.length > 0) {
            const newMinAge = Math.min(...props.data.map((row: Candidate) => {
                return Number(row.VEK)
            }))

            const newMaxAge = Math.max(...props.data.map((row: Candidate) => {
                return Number(row.VEK)
            }))
            setMinMaxAge([newMinAge, newMaxAge])
        }
    }, [props.data])

    useEffect(() => {
        if (minMaxAge[1] > 0 && (minMaxAge[1] < props.view.age[1]) || !hasChanged) {
            props.setView((prev) => { return { ...prev, age: [prev.age[0], minMaxAge[1]] } })
        }
        if (minMaxAge[0] > 0 && (minMaxAge[0] > props.view.age[0]) || !hasChanged) {
            props.setView((prev) => { return { ...prev, age: [minMaxAge[0], prev.age[1]] } })
        }
    }, [minMaxAge])


    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={"ageFilter"}>{`Věk kandidujících: ${props.view.age[0] === props.view.age[1] ? `${props.view.age[1]} let` : `${props.view.age[0]} - ${props.view.age[1]} let`}`}</Label>
            <Slider id={"ageFilter"} value={props.view.age} min={minMaxAge[0]} max={minMaxAge[1]} step={1} onValueChange={handleValueChange} />
        </div>
    )
}