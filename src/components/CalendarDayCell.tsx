import type { StudyDay, StudySession, Subject } from "../types";

interface CalendarDayCellProps {
  date: string;
  dayNumber: number;
  monthLabel?: string;
  studyDay?: StudyDay;
  subjectsById: Map<string, Subject>;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  onSelect: (date: string) => void;
}

function timeStart(session: StudySession) {
  return session.time.split(" - ")[0];
}

export function CalendarDayCell({
  date,
  dayNumber,
  monthLabel,
  studyDay,
  subjectsById,
  isToday,
  isSelected,
  isInRange,
  onSelect,
}: CalendarDayCellProps) {
  const sessions = studyDay?.sessions ?? [];
  const examSessions = sessions.filter((session) => session.isExam);

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      className={`min-h-[106px] border-r border-t border-slate-200 bg-white p-1.5 text-left align-top transition hover:bg-slate-50 md:min-h-[126px] xl:min-h-[118px] ${
        !isInRange ? "bg-slate-50/70 text-slate-300" : ""
      } ${isSelected ? "relative z-10 ring-3 ring-blue-500" : ""}`}
    >
      <div className="mb-1.5 flex min-h-6 items-start justify-between gap-1">
        <div className="flex flex-wrap items-center gap-1">
          <span className={`text-xs font-black md:text-sm ${isToday ? "rounded-full bg-blue-600 px-2 py-0.5 text-white" : "text-slate-950"}`}>
            {dayNumber}
          </span>
          {monthLabel && <span className="text-xs font-bold uppercase text-slate-400">{monthLabel}</span>}
          {isToday && <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[9px] font-black uppercase text-blue-700">Hôm nay</span>}
        </div>
        {examSessions.length > 0 && <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-[9px] font-black text-white">THI</span>}
      </div>

      <div className="space-y-0.5">
        {sessions.slice(0, 3).map((session) => {
          const subject = session.subjectId ? subjectsById.get(session.subjectId) : undefined;
          const background = session.isExam ? subject?.textColor ?? "#dc2626" : subject?.softColor ?? "#f1f5f9";
          const color = session.isExam ? "#ffffff" : subject?.textColor ?? "#475569";

          return (
            <div
              key={session.id}
              className={`flex min-h-5 items-center gap-1 truncate rounded-md px-1.5 text-[11px] font-black shadow-sm ${
                session.isExam ? "ring-1 ring-red-200" : ""
              }`}
              style={{ backgroundColor: background, color }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
              <span className="shrink-0">{timeStart(session)}</span>
              <span className="truncate">{session.subjectName}</span>
            </div>
          );
        })}
      </div>
    </button>
  );
}
