import { AlertTriangle, CalendarCheck2 } from "lucide-react";
import type { StudyDay, Subject } from "../types";
import { StudySessionCard } from "./StudySessionCard";

interface TodayFocusProps {
  focusDay?: StudyDay;
  subjects: Subject[];
  urgentSubjects: Subject[];
  isCompleted: (sessionId: string) => boolean;
  getNote: (sessionId: string) => string;
  onToggle: (sessionId: string) => void;
  onNoteChange: (sessionId: string, note: string) => void;
}

export function TodayFocus({ focusDay, subjects, urgentSubjects, isCompleted, getNote, onToggle, onNoteChange }: TodayFocusProps) {
  const subjectMap = new Map(subjects.map((subject) => [subject.id, subject]));

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sky-700">
            <CalendarCheck2 className="h-5 w-5" />
            <h2 className="text-xl font-bold text-slate-950">Gợi ý học hôm nay</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {focusDay ? `Lịch ưu tiên cho ngày ${focusDay.label}.` : "Không còn lịch học trong kế hoạch."}
          </p>
        </div>

        {urgentSubjects.length > 0 && (
          <div className="rounded-3xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Ưu tiên trong 2 ngày tới
            </div>
            <p className="mt-1">{urgentSubjects.map((subject) => subject.name).join(", ")}</p>
          </div>
        )}
      </div>

      {focusDay ? (
        <div className="grid gap-3 xl:grid-cols-3">
          {focusDay.sessions.map((session) => (
            <StudySessionCard
              key={session.id}
              session={session}
              subject={session.subjectId ? subjectMap.get(session.subjectId) : undefined}
              completed={isCompleted(session.id)}
              note={getNote(session.id)}
              onToggle={onToggle}
              onNoteChange={onNoteChange}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-500">Bạn đã đi hết lịch ôn thi này.</div>
      )}
    </section>
  );
}
