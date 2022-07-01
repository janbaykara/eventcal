import { ChakraProvider } from '@chakra-ui/react'
import { Calendar, CalendarControls, CalendarDate, CalendarDays, CalendarDefaultTheme, CalendarMonth, CalendarMonthName, CalendarMonths, CalendarNextButton, CalendarPrevButton, CalendarValues, CalendarWeek } from '@uselessdev/datepicker'

export function DatePicker({ date, handleSelectDate }: { date: Date, handleSelectDate: (value: CalendarValues | CalendarDate) => void }) {
  return (
    <ChakraProvider theme={CalendarDefaultTheme}>
      <Calendar
        value={{ start: date }}
        onSelectDate={handleSelectDate}
        singleDateSelection
        allowOutsideDays
        disablePastDates
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </ChakraProvider>
  )
}