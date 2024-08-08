import { useEffect, useState } from 'react'

import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

import { FilterPropsType, Candidate } from '../../types'


export default function RankFilter(props: FilterPropsType) {
    const [maxRank, setMaxRank] = useState(28)
    const [hasChanged, setHasChanged] = useState<boolean>(false)

    const handleValueChange = (value: [number, number]) => {
        props.setView((prev) => { return { ...prev, rank: value } })
        setHasChanged(true)
    }

    useEffect(() => {
        if (props.data.length > 0) {
            const newMaxRank = Math.max(...props.data.map((row: Candidate) => {
                return Number(row.PORCISLO)
            }))
            setMaxRank(newMaxRank)
        }
    }, [props.data])

    useEffect(() => {
        if (maxRank > 0 && maxRank < props.view.rank[1] || !hasChanged) {
            props.setView((prev) => { return { ...prev, rank: [prev.rank[0], maxRank] } })
        }
    }, [maxRank])
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={"rankFilter"}>{`Pořadí na kandidátce: ${props.view.rank[0] === props.view.rank[1] ? `${props.view.rank[1]}.` : `${props.view.rank[0]}. - ${props.view.rank[1]}.`} místo`}</Label>
            <Slider id={"rankFilter"} value={props.view.rank} min={1} max={maxRank} step={1} onValueChange={handleValueChange} />
        </div>)
}