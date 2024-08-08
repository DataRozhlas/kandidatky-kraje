import RankFilter from "./filters/RankFilter"
import AgeFilter from "./filters/AgeFilter"
import SexFilter from "./filters/SexFilter"
import SearchFilter from "./filters/SearchFilter"
import MandateFilter from "./filters/MandateFilter"
import PartyFilter from "./filters/PartyFilter"

import { Label } from "@/components/ui/label"
import { Card } from "./ui/card"


import { FilterPropsType } from "@/types"


export default function Filters(props: FilterPropsType) {

    return (
        <div className="hidden sm:flex flex-col gap-3">
            <Label htmlFor="filters">Nastavte filtry</Label>
            <Card id="filters" className="w-full rounded-lg border p-6">
                {props.data.length === 0 && <div className="text-sm text-center">Nejdřív vyberte aspoň jeden rok</div>}
                {props.data.length > 0 && <div className="flex flex-wrap justify-evenly gap-10 ">

                    <div className="flex flex-col justify-between  w-full sm:w-[46%] lg:w-[30%] sm:h-56">
                        <SearchFilter {...props} />
                        <SexFilter {...props} />
                    </div>
                    <div className="flex flex-col justify-between  w-full sm:w-[46%] lg:w-[30%] sm:h-56">

                        <RankFilter {...props} />
                        <AgeFilter {...props} />
                        <MandateFilter {...props} />


                    </div>
                    <div className="flex flex-col justify-between w-full sm:w-[46%] lg:w-[30%] sm:h-56">
                        <PartyFilter {...props} />
                    </div>
                </div>}
            </Card>
        </div>
    )
}