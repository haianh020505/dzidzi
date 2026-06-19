import { BarChart3 } from "lucide-react";
import type { Phase, StudySession, Subject } from "../types";

interface ProgressSectionProps {
  sessions: StudySession[];
  subjects: Subject[];
  phases: Phase[];
  isCompleted: (sessionId: string) => boolean;
}

function percent(done: number, total: number) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function ProgressRow({ label, value, color = "#60a5fa" }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-bold text-slate-950">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function ProgressSection({ sessions, subjects, phases, isCompleted }: ProgressSectionProps) {
  const completed = sessions.filter((session) => isCompleted(session.id)).length;
  const totalProgress = percent(completed, sessions.length);

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Tiến độ học</h2>
          <p className="text-sm text-slate-500">Tổng quan, theo môn và theo giai đoạn.</p>
        </div>
      </div>

      <div className="space-y-5">
        <ProgressRow label="Toàn bộ lịch" value={totalProgress} color="#38bdf8" />

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-800">Theo môn</h3>
            {subjects.map((subject) => {
              const subjectSessions = sessions.filter((session) => session.subjectId === subject.id);
              const subjectCompleted = subjectSessions.filter((session) => isCompleted(session.id)).length;
              return <ProgressRow key={subject.id} label={subject.name} value={percent(subjectCompleted, subjectSessions.length)} color={subject.color} />;
            })}
          </div>

          <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-800">Theo giai đoạn</h3>
            {phases.map((phase) => {
              const phaseSessions = sessions.filter((session) => session.phaseId === phase.id);
              const phaseCompleted = phaseSessions.filter((session) => isCompleted(session.id)).length;
              return <ProgressRow key={phase.id} label={`${phase.name} · ${phase.range}`} value={percent(phaseCompleted, phaseSessions.length)} color="#a78bfa" />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
