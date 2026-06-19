import { Calendar, Filter, LayoutList, Sparkles, Target } from "lucide-react";
import type { FilterState, Phase, Subject, ViewMode } from "../types";

interface FiltersProps {
  filters: FilterState;
  subjects: Subject[];
  phases: Phase[];
  onChange: (filters: FilterState) => void;
}

const views: Array<{ id: ViewMode; label: string; icon: typeof LayoutList }> = [
  { id: "timeline", label: "Timeline", icon: LayoutList },
  { id: "subject", label: "Theo môn", icon: Target },
  { id: "today", label: "Hôm nay", icon: Calendar },
  { id: "upcoming", label: "Sắp thi", icon: Sparkles },
];

export function Filters({ filters, subjects, phases, onChange }: FiltersProps) {
  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => onChange({ ...filters, [key]: value });

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-soft">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
        <Filter className="h-4 w-4 text-sky-600" />
        Bộ lọc và chế độ xem
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                type="button"
                onClick={() => setFilter("view", view.id)}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-2xl px-3 text-sm font-bold transition ${
                  filters.view === view.id ? "bg-slate-950 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {view.label}
              </button>
            );
          })}
        </div>

        <select
          value={filters.subjectId}
          onChange={(event) => setFilter("subjectId", event.target.value)}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
        >
          <option value="all">Tất cả môn học</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={filters.completion}
            onChange={(event) => setFilter("completion", event.target.value as FilterState["completion"])}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chưa hoàn thành</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
          <select
            value={filters.phaseId}
            onChange={(event) => setFilter("phaseId", event.target.value as FilterState["phaseId"])}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">Tất cả giai đoạn</option>
            {phases.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {phase.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
