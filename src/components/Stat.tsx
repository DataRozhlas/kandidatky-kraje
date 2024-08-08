import { User, UserCheck, CalendarClock, Vote } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Stat({ title, number, subtitle, icon }: { title: string, number: string, subtitle: string, icon: "user" | "user-check" | "female" | "clock" | "vote" }) {
    return (
        <Card className="w-half-minus-gap sm:w-third-minus-gap">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon === "user" && <User className="h-5 w-5 text-muted-foreground" />}
                {icon === "user-check" && <UserCheck className="h-5 w-5 text-muted-foreground" />}
                {icon === "female" && <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18H15M12 13V21M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                {icon === "clock" && <CalendarClock className="h-5 w-5 text-muted-foreground" />}
                {icon === "vote" && <Vote className="h-5 w-5 text-muted-foreground" />}

            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{number}</div>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    )
}
