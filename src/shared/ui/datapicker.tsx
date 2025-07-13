import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

// import { cn } from "@/app/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"
interface props{
  state:  undefined | Date ;
  func: (action: Date | undefined) => void
}

export const DatePickerDemo: React.FC<props> = ({state, func}) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!state}
          className=" bg-w data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
        >
          <CalendarIcon />
          {state ? format(state, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={state} onSelect={(e) => func(e)} />
      </PopoverContent>
    </Popover>
  )
}