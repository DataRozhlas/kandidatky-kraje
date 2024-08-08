import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Candidate } from "@/types"

export const columns: ColumnDef<Candidate>[] = [
    {
        accessorKey: "ROK",
        header: "Rok",
    },
    {
        accessorKey: "PORCISLO",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    #
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{Number(row.getValue("PORCISLO"))}</div>)
        },

    },
    {
        accessorKey: "ESTRANA",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Číslo<br />strany
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{Number(row.getValue("ESTRANA"))}</div>)
        },
    },
    {
        accessorKey: "MANDAT",
        header: "Mandát",
    },
    {
        accessorKey: "JMENO",
        header: "Jméno",
    },
    {
        accessorKey: "PRIJMENI",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jméno
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (a: any, b: any, columnId: string) => {
            const result = new Intl.Collator('cs-CZ').compare(a.getValue(columnId), b.getValue(columnId))
            return result
        },
        cell: ({ row }: { row: any }) => {
            const titpred = row.getValue("TITULPRED");
            const jmeno = row.getValue("JMENO");
            const prijmeni = row.getValue("PRIJMENI");
            const titza = row.getValue("TITULZA");
            return (<span className="text-sm">{titpred} {jmeno} <span className="font-bold">{prijmeni}</span> {titza}</span>)
        }
    },
    {
        accessorKey: "TITULPRED",
        header: "Titul před",
    },
    {
        accessorKey: "TITULZA",
        header: "Titul za",

    },
    {
        accessorKey: "POHLAVI",
        header: "Pohlaví",
    },
    {
        accessorKey: "VEK",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Věk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{row.getValue("VEK")} let</div>)
        },
    },
    {
        accessorKey: "POVOLANI",
        header: "Povolání",
    },
    {
        accessorKey: "BYDLISTEN",
        header: "Bydliště",
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{row.getValue("BYDLISTEN")}</div>)
        },
    },
    {
        accessorKey: "VOLEBNI.NAZEVCELK",
        id: "VNC",
    },
    {
        accessorKey: "VOLEBNI.NAZEV_STRV",
        id: "VPN",
        header: "Volební strana",
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>{row.getValue("VPN")}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.getValue("VNC")}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>)
        },
    },
    {
        accessorKey: "NAVRHUJICI.NAZEV_STRV",
        id: "NPN",
        header: "Navrhující plný název",
    },

    {
        accessorKey: "NAVRHUJICI.ZKRATKAV8",
        id: "NZ8",
        header: "Navrhující",
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>{row.getValue("NZ8")}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.getValue("NPN")}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>)
        },
    },
    {
        accessorKey: "POCHLASU",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Pref.<br />hl.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{isNaN(Number(row.getValue("POCHLASU"))) ? "0" : Number(row.getValue("POCHLASU")).toLocaleString("cs-CZ")}</div>)
        },

    },
    {
        accessorKey: "POCPROC",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Pref.<br />%
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{isNaN(Number(row.getValue("POCPROC"))) ? "0" : Number(row.getValue("POCPROC")).toLocaleString("cs-CZ")} %</div>)
        },

    },
    {
        accessorKey: "STATOBCAN",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Občanství
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },

]
