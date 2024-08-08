import RankFilter from "./filters/RankFilter"
import AgeFilter from "./filters/AgeFilter"
import SexFilter from "./filters/SexFilter"
import SearchFilter from "./filters/SearchFilter"
import MandateFilter from "./filters/MandateFilter"
import PartyFilter from "./filters/PartyFilter"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    //    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"

import { ScrollArea } from '@/components/ui/scroll-area';

import { FilterPropsType } from "@/types"


export default function Filters(props: FilterPropsType) {


    return (

        <Drawer>
            <DrawerTrigger>
                <Button className="w-full sm:hidden" variant="outline">Nastavte filtry</Button>
            </DrawerTrigger>
            <DrawerContent className="w-full">
                <DrawerHeader>
                    <DrawerTitle>Nastavte filtry</DrawerTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
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
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Zavřít</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}