import { AlertTriangle, CalendarDays } from "lucide-react";
import type { Subject, SubjectStatus } from "../types";

interface SubjectListProps {
  subjects: Subject[];
  getDaysUntil: (date: string) => number;
  getStatus: (subject: Subject) => SubjectStatus;
}

const statusClasses: Record<SubjectStatus, string> = {
  "Chưa học": "bg-slate-100 text-slate-600",
  "Đang học": "bg-sky-100 text-sky-700",
  "Sắp thi": "bg-amber-100 text-amber-700",
  "Đã thi": "bg-emerald-100 text-emerald-700",
};

export function SubjectList({ subjects, getDaysUntil, getStatus }: SubjectListProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Môn học</h2>
          <p className="text-sm text-slate-500">Màu riêng, ngày thi và trạng thái hiện tại.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {subjects.map((subject) => {
          const days = getDaysUntil(subject.examDate);
          const status = getStatus(subject);
          return (
            <article key={subject.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: subject.color }} />
                {days <= 2 && days >= 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Gần thi
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950">{subject.name}</h3>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" />
                {new Date(subject.examDate).toLocaleDateString("vi-VN")}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[status]}`}>{status}</span>
                <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: subject.softColor, color: subject.textColor }}>
                  {days < 0 ? "Đã qua" : `${days} ngày`}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
