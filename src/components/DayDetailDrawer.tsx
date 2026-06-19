import { BookOpen, CalendarDays, Clock3, Moon, Sun, Sunset, X } from "lucide-react";
import type { StudyDay, Subject } from "../types";

interface DayDetailDrawerProps {
  day?: StudyDay;
  date: string | null;
  subjectsById: Map<string, Subject>;
  onClose: () => void;
}

const slotMeta = {
  1: { label: "Sáng", icon: Sun },
  2: { label: "Chiều", icon: Sunset },
  3: { label: "Tối", icon: Moon },
} as const;

function formatTitle(date: string | null) {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function DayDetailDrawer({ day, date, subjectsById, onClose }: DayDetailDrawerProps) {
  if (!date) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35 backdrop-blur-sm">
      <button type="button" aria-label="Đóng chi tiết ngày" className="absolute inset-0 cursor-default" onClick={onClose} />

      <aside className="relative z-10 flex h-full w-full max-w-[500px] flex-col bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <CalendarDays className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black capitalize text-slate-950">{formatTitle(date)}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {day ? `${day.sessions.length} ca học / ôn thi` : "Không có lịch học trong ngày này"}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl bg-slate-100 p-2.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="soft-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {day ? (
            day.sessions.map((session) => {
              const subject = session.subjectId ? subjectsById.get(session.subjectId) : undefined;
              const Icon = slotMeta[session.slot].icon;
              const color = subject?.textColor ?? "#475569";
              const background = subject?.softColor ?? "#f8fafc";

              return (
                <article key={session.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: background, color }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-black text-slate-700">
                          <Clock3 className="h-3.5 w-3.5" />
                          {session.time.split(" - ")[0]}
                        </span>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500">{slotMeta[session.slot].label}</span>
                        {session.isExam && <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">THI</span>}
                      </div>
                      <h3 className="mt-3 text-lg font-black" style={{ color }}>
                        {session.subjectName}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{session.content}</p>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 font-bold text-slate-700">Ngày này chưa có lịch học.</p>
              <p className="mt-1 text-sm text-slate-500">Bạn có thể nghỉ, đọc nhẹ hoặc chuẩn bị cho ngày tiếp theo.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
