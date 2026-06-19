import type { StudyDay, Subject } from "../types";
import { CalendarDayCell } from "./CalendarDayCell";

interface CalendarMonthProps {
  days: string[];
  scheduleByDate: Map<string, StudyDay>;
  subjectsById: Map<string, Subject>;
  todayIso: string;
  startIso: string;
  endIso: string;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const weekdayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function parseIso(date: string) {
  return new Date(`${date}T00:00:00`);
}

function getMonthLabel(date: Date) {
  return `Th${date.getMonth() + 1}`;
}

export function CalendarMonth({
  days,
  scheduleByDate,
  subjectsById,
  todayIso,
  startIso,
  endIso,
  selectedDate,
  onSelectDate,
}: CalendarMonthProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_36px_rgba(30,41,59,0.10)]">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100/80">
        {weekdayLabels.map((label) => (
          <div key={label} className="px-2 py-2.5 text-center text-sm font-black text-slate-500">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          const parsed = parseIso(date);
          const prevDate = index > 0 ? parseIso(days[index - 1]) : null;
          const startsNewMonth = !prevDate || prevDate.getMonth() !== parsed.getMonth();

          return (
            <CalendarDayCell
              key={date}
              date={date}
              dayNumber={parsed.getDate()}
              monthLabel={startsNewMonth ? getMonthLabel(parsed) : undefined}
              studyDay={scheduleByDate.get(date)}
              subjectsById={subjectsById}
              isToday={date === todayIso}
              isSelected={selectedDate === date}
              isInRange={date >= startIso && date <= endIso}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </section>
  );
}
