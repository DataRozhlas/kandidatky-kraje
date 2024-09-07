import RankFilter from "./filters/RankFilter"
import AgeFilter from "./filters/AgeFilter"
import SexFilter from "./filters/SexFilter"
import SearchFilter from "./filters/SearchFilter"
import MandateFilter from "./filters/MandateFilter"
import PartyFilter from "./filters/PartyFilter"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { ScrollArea } from '@/components/ui/scroll-area';

import { FilterPropsType } from "@/types"


export default function Filters(props: FilterPropsType) {


    return (

        <Dialog >
            <DialogTrigger>
                <Button className="w-full sm:hidden" variant="outline">Nastavte filtry</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Nastavte filtry</DialogTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DialogHeader>
                {props.data.length === 0 && <div className="text-sm text-center">Nejdřív vyberte aspoň jeden rok</div>}
                {props.data.length > 0 && <div className="h-[40vh]">
                    <ScrollArea className="w-full h-[40vh]">
                        <div className="flex flex-col gap-10 px-4">
                            <SearchFilter {...props} />
                            <SexFilter {...props} />
                            <RankFilter {...props} />
                            <AgeFilter {...props} />
                            <MandateFilter {...props} />
                            <PartyFilter {...props} />
                        </div>
                    </ScrollArea></div>

                }
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Zavřít</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}