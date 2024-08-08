import { useEffect, useState } from 'react';
import { FilterPropsType, Party } from '../../types';

import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
// import { Badge } from "@/components/ui/badge";
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export default function PartyFilter(props: FilterPropsType) {
    const [hasChanged, setHasChanged] = useState<boolean>(false)

    const availableParties: (Party | null)[] = Array.from(new Set(props.data.map(row => row.VOLEBNI))).sort((a: Party | null, b: Party | null) => a === null || b === null ? 0 : Number(a.VSTRANA) - Number(b.VSTRANA))


    const handleCheckedChange = (value: string) => {
        props.setView((prev) => {
            let newParties = [...prev.parties];
            const index = newParties.indexOf(value);
            if (index === -1) {
                newParties.push(value)
            } else {
                newParties.splice(index, 1)
            }
            return {
                ...prev,
                parties: newParties,
            }
        })
        setHasChanged(true)
    }

    const deselectAll = () => {
        props.setView((prev) => {
            return {
                ...prev,
                parties: [""],
            }
        })
        setHasChanged(false)
    }

    const selectAll = () => {
        props.setView((prev) => {
            return {
                ...prev,
                parties: availableParties.map(party => party === null ? "" : party.VSTRANA),
            }
        })
        setHasChanged(false)
    }


    useEffect(() => {
        if (!hasChanged) {
            props.setView((prev) => {
                return {
                    ...prev,
                    parties: availableParties.map(party => party === null ? "" : party.VSTRANA)
                }
            })
        }
        if (hasChanged) {
            // check if all selected parties are available and if not, remove them from view
            props.setView((prev) => {
                return {
                    ...prev,
                    parties: prev.parties.filter((party) => availableParties.map(party => party === null ? "" : party.VSTRANA).includes(party))
                }
            })

        }
    }, [props.data])

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between">
                <Label htmlFor="partyFilter">Volební strany</Label>
                {/* <Badge variant={"secondary"} className={""}>{`${props.view.parties.length} z ${availableParties.length}`}</Badge> */}
                {props.view.parties.length > availableParties.length / 2 && <Button variant={"link"} size={"sm"} className={"-translate-y-2 h-7"} onClick={deselectAll}>zrušit vše</Button>}
                {props.view.parties.length <= availableParties.length / 2 && <Button variant={"link"} size={"sm"} className={"-translate-y-2 h-7"} onClick={selectAll}>vybrat vše</Button>}

            </div>
            <ScrollArea className="h-full">
                <div id="partyFilter" className="flex flex-col gap-1">
                    {availableParties.map((party, index) => {
                        if (party === null) return null;
                        return (
                            <div key={index} className="flex items-center space-x-1">
                                <Checkbox id={party.VSTRANA} value={party.VSTRANA} checked={props.view.parties.includes(party.VSTRANA)} onCheckedChange={() => handleCheckedChange(party.VSTRANA)} />
                                <Label htmlFor={party.VSTRANA} className={"text-xs cursor-pointer"}>{party.ZKRATKAV30}</Label>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )

}