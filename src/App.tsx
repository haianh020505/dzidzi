import { useMemo, useState } from "react";
import { AlertTriangle, BookOpen, CalendarRange, GraduationCap, Layers3 } from "lucide-react";
import { CalendarMonth } from "./components/CalendarMonth";
import { DayDetailDrawer } from "./components/DayDetailDrawer";
import { allSessions, scheduleDays, subjects } from "./data/schedule";
import type { StudyDay, Subject } from "./types";

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseIso(date: string) {
  return new Date(`${date}T00:00:00`);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function diffDays(fromIso: string, toIso: string) {
  return Math.ceil((parseIso(toIso).getTime() - parseIso(fromIso).getTime()) / 86_400_000);
}

function startOfWeekMonday(date: Date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(date, diff);
}

function endOfWeekSunday(date: Date) {
  const start = startOfWeekMonday(date);
  return addDays(start, 6);
}

function buildCalendarDays(startIso: string, endIso: string) {
  const start = startOfWeekMonday(parseIso(startIso));
  const end = endOfWeekSunday(parseIso(endIso));
  const days: string[] = [];

  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
    days.push(toIsoDate(cursor));
  }

  return days;
}

function formatShort(date: string) {
  return parseIso(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

function subjectStatus(todayIso: string, subject: Subject) {
  const days = diffDays(todayIso, subject.examDate);
  if (days < 0) return "Đã thi";
  if (days <= 2) return "Sắp thi";
  return `${days} ngày nữa`;
}

export default function App() {
  const todayIso = toIsoDate(new Date());
  const finalExamIso = useMemo(() => {
    const examDates = subjects.map((subject) => subject.examDate).sort();
    return examDates[examDates.length - 1] ?? todayIso;
  }, [todayIso]);
  const calendarStartIso = todayIso;
  const calendarEndIso = finalExamIso;
  const [selectedDate, setSelectedDate] = useState<string | null>(todayIso);

  const subjectsById = useMemo(() => new Map(subjects.map((subject) => [subject.id, subject])), []);
  const scheduleByDate = useMemo(() => new Map(scheduleDays.map((day) => [day.date, day] as const)), []);
  const calendarDays = useMemo(() => buildCalendarDays(calendarStartIso, calendarEndIso), [calendarStartIso, calendarEndIso]);
  const selectedDay: StudyDay | undefined = selectedDate ? scheduleByDate.get(selectedDate) : undefined;
  const remainingSubjects = subjects.filter((subject) => diffDays(todayIso, subject.examDate) >= 0);
  const urgentSubjects = remainingSubjects.filter((subject) => diffDays(todayIso, subject.examDate) <= 2);
  const totalDays = diffDays(calendarStartIso, calendarEndIso) + 1;
  const examSessionCount = allSessions.filter((session) => session.isExam).length;

  return (
    <main className="min-h-screen bg-[#f4f6ff] text-slate-900">
      <header className="bg-gradient-to-r from-[#201b55] via-[#31267d] to-[#4934d3] px-4 py-5 text-white md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15">
                <BookOpen className="h-6 w-6 text-lime-300" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight md:text-3xl">Lịch Ôn Thi Cuối Kỳ</h1>
                <p className="mt-1 text-sm font-bold text-white/65 md:text-base">
                  {formatShort(calendarStartIso)} {"->"} {formatShort(calendarEndIso)} · {remainingSubjects.length} môn · 3 ca/ngày
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:w-auto">
            <div className="rounded-2xl bg-white/12 px-4 py-3 text-center shadow-sm ring-1 ring-white/15">
              <p className="text-2xl font-black">{totalDays}</p>
              <p className="mt-1 text-xs font-black uppercase text-white/60">Ngày</p>
            </div>
            <div className="rounded-2xl bg-white/12 px-4 py-3 text-center shadow-sm ring-1 ring-white/15">
              <p className="text-2xl font-black">{remainingSubjects.length}</p>
              <p className="mt-1 text-xs font-black uppercase text-white/60">Môn thi</p>
            </div>
            <div className="rounded-2xl bg-white/12 px-4 py-3 text-center shadow-sm ring-1 ring-white/15">
              <p className="text-2xl font-black">{examSessionCount}</p>
              <p className="mt-1 text-xs font-black uppercase text-white/60">Lượt thi</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1800px] gap-4 px-4 py-4 md:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-3">
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_14px_36px_rgba(30,41,59,0.09)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-slate-400">Môn học</h2>
                <p className="mt-1 text-xs font-semibold text-slate-500">Màu môn trong lịch.</p>
              </div>
              <Layers3 className="h-5 w-5 text-slate-300" />
            </div>

            {urgentSubjects.length > 0 && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs font-bold text-amber-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Sắp thi trong 2 ngày
                </div>
                <p className="mt-1 text-amber-700">{urgentSubjects.map((subject) => subject.name).join(", ")}</p>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {subjects.map((subject) => {
                const days = diffDays(todayIso, subject.examDate);
                return (
                  <article key={subject.id} className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-slate-50">
                    <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: subject.textColor }} />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-black text-slate-900">{subject.name}</h3>
                      <p className="mt-0.5 truncate text-xs font-bold text-slate-400">
                        {new Date(`${subject.examDate}T00:00:00`).toLocaleDateString("vi-VN")} · {subjectStatus(todayIso, subject)}
                      </p>
                    </div>
                    {days >= 0 && days <= 2 && (
                      <span className="rounded-lg bg-red-500 px-2 py-1 text-[10px] font-black text-white">THI</span>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-4 text-blue-900 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarRange className="h-5 w-5" />
              <h2 className="font-black">Cách dùng</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-blue-800/80">
              Bấm vào từng ngày trong lịch để xem đủ 3 ca học. Các ngày có thi được gắn nhãn đỏ để ưu tiên ôn nhanh.
            </p>
          </section>
        </aside>

        <section className="min-w-0">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-500">Calendar view</p>
              <h2 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">Từ hôm nay đến môn thi cuối cùng</h2>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-600 shadow-sm">
              <GraduationCap className="h-4 w-4 text-indigo-500" />
              Kết thúc: {new Date(`${calendarEndIso}T00:00:00`).toLocaleDateString("vi-VN")}
            </div>
          </div>

          <CalendarMonth
            days={calendarDays}
            scheduleByDate={scheduleByDate}
            subjectsById={subjectsById}
            todayIso={todayIso}
            startIso={calendarStartIso}
            endIso={calendarEndIso}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </section>
      </div>

      <DayDetailDrawer day={selectedDay} date={selectedDate} subjectsById={subjectsById} onClose={() => setSelectedDate(null)} />
    </main>
  );
}
