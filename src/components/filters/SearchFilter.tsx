import { FormEvent, useState } from "react"
import { FilterPropsType } from "@/types"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { CircleX } from 'lucide-react';

export default function SearchFilter(props: FilterPropsType) {
    const [searchValue, setSearchValue] = useState<string>("")

    const handleValueChange = (event: FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
        props.setView((prev) => {
            return {
                ...prev,
                search: {
                    value: event.currentTarget.value.toLocaleUpperCase("cs-CZ"),
                    fields: prev.search.fields
                }
            }
        })
    }

    const handleInputClear = () => {
        setSearchValue("")
        props.setView((prev) => {
            return {
                ...prev,
                search: {
                    ...prev.search,
                    value: "",
                }
            }
        })
    }

    const handleCheckChange = (arrayIndex: number) => {
        let newFields = [...props.view.search.fields];
        newFields[arrayIndex] = !newFields[arrayIndex];

        props.setView((prev) => {
            return {
                ...prev,
                search: {
                    value: prev.search.value,
                    fields: newFields
                }
            }
        })
    }


    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="searchFilter">Hledat</Label>
            <Input id="searchFilter" value={searchValue} onInput={handleValueChange} />
            {searchValue.length > 0 && <CircleX className={"absolute self-end translate-y-8 mr-2 stroke-zinc-300 cursor-pointer hover:stroke-zinc-950"} size={20} onClick={handleInputClear} />}
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Checkbox id="jmenoSearch" checked={props.view.search.fields[0]} onCheckedChange={() => handleCheckChange(0)} className="h-4 w-4" />
                    <Label htmlFor="jmenoSearch" className="text-xs">jméno</Label>
                </div>
                <div className="flex items-center gap-1">
                    <Checkbox id="povolaniSearch" checked={props.view.search.fields[1]} onCheckedChange={() => handleCheckChange(1)} />
                    <Label htmlFor="povolaniSearch" className="text-xs">povolání</Label>
                </div>
                <div className="flex items-center gap-1">
                    <Checkbox id="bydlisteSearch" checked={props.view.search.fields[2]} onCheckedChange={() => handleCheckChange(2)} />
                    <Label htmlFor="bydlisteSearch" className="text-xs">bydliště</Label>
                </div>
            </div>


        </div>
    )
}