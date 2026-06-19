import { BookOpen, CalendarClock, CheckCircle2, Clock3, GraduationCap } from "lucide-react";
import type { Subject } from "../types";

interface DashboardProps {
  subjects: Subject[];
  completedCount: number;
  remainingCount: number;
  nearestExam?: Subject;
  daysToNearestExam: number | null;
}

export function Dashboard({ subjects, completedCount, remainingCount, nearestExam, daysToNearestExam }: DashboardProps) {
  const cards = [
    { label: "Tổng số môn", value: subjects.length, icon: BookOpen, color: "bg-sky-100 text-sky-700" },
    { label: "Ngày tới kỳ thi gần nhất", value: daysToNearestExam ?? "—", icon: CalendarClock, color: "bg-violet-100 text-violet-700" },
    { label: "Buổi đã hoàn thành", value: completedCount, icon: CheckCircle2, color: "bg-emerald-100 text-emerald-700" },
    { label: "Buổi còn lại", value: remainingCount, icon: Clock3, color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">Study planner</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Lịch học và ôn thi</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Theo dõi ca học, ngày thi, ghi chú và tiến độ trong một dashboard gọn như planner cá nhân.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-amber-100 to-rose-100 px-4 py-3 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-rose-700">
            <GraduationCap className="h-4 w-4" />
            Môn thi gần nhất
          </div>
          <p className="mt-1 text-lg font-bold text-slate-950">{nearestExam?.name ?? "Không có"}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
          <div key={card.label} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${card.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-950">{card.value}</p>
            <p className="mt-1 text-sm text-slate-500">{card.label}</p>
          </div>
          );
        })}
      </div>
    </section>
  );
}
